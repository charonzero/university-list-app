import axios from "axios";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Icon from "@mdi/react";
import { mdiWeb, mdiStar } from "@mdi/js";
import { Wrapper } from "../components/Wrapper/Wrapper";
import Header from "../components/header";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const [favourite, setfavourite] = useState([]);

  const [hasMore, sethasMore] = useState(true);
  const [universities, setuniversities] = useState([]);
  const [n, setn] = useState(40);
  const [sort, setsort] = useState(["asc", "name"]);
  const [university, setUniversity] = useState("");
  const [country, setCountry] = useState("");

  const [email, setemail] = useState("");

  const [sidebar, setsidebar] = useState(false);
  function togglesidebar() {
    setsidebar(!sidebar);
    document.body.classList.toggle("overflow-y-hidden");
  }

  const fetchData = async () => {
    var tempData = await axios
      .post("./api/favourite")
      .then((response) => {
        return Sorting(response.data.favourite);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("./api/session")
      .then((response) => {
        if (response.data.session) {
          setemail(response.data.session.email);
        } else {
          setemail("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    await axios
      .post("./api/favourite")
      .then((response) => {
        setfavourite(response.data.favourite);
      })
      .catch(function (error) {
        console.log(error);
      });
    // setdata(tempData);
    if (tempData?.length > n) {
      sethasMore(true);
      setuniversities(tempData.slice(0, n));
    } else {
      sethasMore(false);
      setuniversities(tempData);
    }
  };

  const loadMore = async () => {
    setn(n + 5);
  };

  function Sorting(array) {
    let temp = array?.sort(function (a, b) {
      return b[sort[1]] > a[sort[1]] ? 1 : b[sort[1]] < a[sort[1]] ? -1 : 0;
    });
    if (sort[0] == "desc") temp.reverse();
    return temp;
  }
  function handleChange(event) {
    if (event.target.value !== undefined && event.target.value !== null) {
      const regex = /([^:\s]+):([^:\s]+)/g;
      let m = regex.exec(event.target.value);
      if (m != null) {
        setsort([m[1], m[2]]);
      }
    }
  }

  async function setFavourite(value) {
    axios
      .get("./api/session")
      .then((response) => {
        if (response.data.session) {
          axios
            .post("./api/favourite", {
              value
            })
            .then((response) => {
              setfavourite(response.data.favourite);
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          router.push("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
  }, [sort, university, country, n]);

  return (
    <Wrapper>
      <Header email={email} sidebar={sidebar} togglesidebar={togglesidebar} />
      <main className="w-full flex">
        <div className="w-full bg-slate-900  px-2 py-14">
          <div className="px-12 w-full my-5 flex flex-wrap md:justify-between">
            <div className="">
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1 w-full md:w-auto"
                placeholder="University Name"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
              />
              <input
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1 w-full md:w-auto"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>
            <select
              onChange={handleChange}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-1 w-auto"
            >
              <option value="asc:name">Name ▲</option>
              <option value="desc:name">Name ▼</option>
              <option value="asc:country">Country ▲</option>
              <option value="desc:country">Country ▼</option>
            </select>
          </div>
          <InfiniteScroll
            className="flex w-full flex-wrap px-10 min-h-screen"
            dataLength={universities?.length}
            next={loadMore}
            hasMore={true}
            loader={
              <div className="w-full flex justify-center">
                <h4 className="text-white">Loading...</h4>
              </div>
            }
          >
            {universities?.length > 0 ? (
              universities?.map(function (university, i) {
                return (
                  <div
                    key={"university_" + i}
                    className="w-1/2 lg:w-1/4 p-2 xl:w-1/6 "
                  >
                    <div className="w-full h-full rounded-md hover:shadow border active:shadow-lg p-2 bg-white relative">
                      <div className="w-full flex flex-wrap h-full">
                        <div className="w-full flex flex-wrap">
                          <h6 className="font-thin w-full text-xs">
                            {university.country}
                          </h6>
                          <h2 className="text-sm md:text-lg text-slate-700 font-semibold w-full">
                            {university.name}
                          </h2>
                        </div>
                        <div className="w-full flex flex-wrap items-center self-end">
                          {university.web_pages?.map(function (web_pages, y) {
                            return (
                              <a
                                key={university.country + "_" + y}
                                href={web_pages}
                                target="_blank"
                              >
                                <Icon
                                  className={
                                    "w-6 h-6 mr-1 text-blue-400 hover:text-blue-600"
                                  }
                                  path={mdiWeb}
                                />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className="absolute right-0 top-0 w-6 h-6"
                        onClick={() => setFavourite(university)}
                      >
                        {favourite?.filter((e) => e.name === university.name)
                          .length > 0 ? (
                          <Icon
                            className={
                              "w-6 h-6 mr-1 text-yellow-400 hover:text-yellow-600"
                            }
                            path={mdiStar}
                          />
                        ) : (
                          <Icon
                            className={
                              "w-6 h-6 mr-1 text-gray-500 hover:text-gray-400"
                            }
                            path={mdiStar}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </InfiniteScroll>
        </div>
      </main>
    </Wrapper>
  );
}
