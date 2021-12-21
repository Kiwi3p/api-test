import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

import "aos/dist/aos.css";
import { AccordionPage } from "../components/Accordion";
import LottieAnimation from "../components/LottieAnimation";

// const axios = require("axios");

interface Props {
  data?: any;
  goodResponse?: any;
  jobs?: any;
  departments?: any;
  animationData?: any;
  loop?: any;
  autoplay?: any;
}

interface Item {
  departments?: any;
  name?: any;
  title?: any;
  id?: any;
}

const Home: NextPage<Props> = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Item[]>([]);
  const [department, setDepartment] = useState<Item[]>([]);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios({
      method: "get",
      url: "https://boards-api.greenhouse.io/v1/boards/via/jobs?utm_medium=email&utm_source=TakeHomeTest&content=true",
    }).then(function (response) {
      setJobs(response.data.jobs);
      setLoading(false);
      // console.log(response);
    });
    axios({
      method: "get",
      url: "https://boards-api.greenhouse.io/v1/boards/via/departments/?utm_medium=email&utm_source=TakeHomeTest&render_as=tree",
    }).then(function (response) {
      setDepartment(response.data.departments);
      // console.log(response);
    });
  }, []);

  console.log(jobs);

  let deptFilter = jobs.filter(
    (item) => item.departments[0].name === selection
  );

  //write function for if department on left is selected equals jobs.data.departments, filter

  return (
    <div className="App">
      {/* <div>
        {newYork.map((item, index) => {
          console.log(newYork);
          return <li key={index}>{item.title}</li>;
        })}
      </div> */}
      <div className="flex lg:flex-row flex-col">
        <div className="lg:m-20 p-5 lg:w-96">
          <h1 className="inter text-base mb-4">Departments</h1>
          <ul>
            {department.map((item, index) => {
              return (
                <>
                  {/* {console.log("selection-id", selection)} */}
                  <li key={index}>
                    <label
                      id={item.id}
                      className="check-container center-radio"
                    >
                      <input
                        type="radio"
                        name={`selection`}
                        onClick={() => setSelection(item.name)}
                        id={item.id}
                        className="check-radio bg-blue text-blue"
                      />
                      <span className="checkmark"></span>
                      <span className="lg:whitespace-nowrap text-sm relative bt-2px">
                        {item.name}
                      </span>
                    </label>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="my-20 lg:mr-32 view-width">
          {/* {jobs.filter((item) => item.departments[0].name === selection)} */}
          {loading ? (
            <div>
              <LottieAnimation />
              Loading
            </div>
          ) : (
            <>
              {selection == null ? (
                <>
                  {/* {jobs.map((item, index) => {
                // console.log(jobs);
                return <li key={index}>{item.title}</li>;
              })} */}
                  <AccordionPage data={jobs} />
                </>
              ) : (
                <>
                  <AccordionPage data={deptFilter} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
