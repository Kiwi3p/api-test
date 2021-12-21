import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { decode } from "html-entities";
import parse from "html-react-parser";
import { AccordionPage } from "../components/Accordion";

// const axios = require("axios");

interface Props {
  data?: any;
  goodResponse?: any;
  jobs?: any;
  departments?: any;
}

interface Item {
  departments?: any;
  name?: any;
  title?: any;
}

const Home: NextPage<Props> = () => {
  const [jobs, setJobs] = useState<Item[]>([]);
  const [department, setDepartment] = useState<Item[]>([]);
  const [selection, setSelection] = useState<Item[]>([]);
  const [deptSelect, setdeptSelect] = useState<Item[]>([]);
  const [checked, setChecked] = useState(false);
  const [clicked, setClicked] = useState<Item[]>([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://boards-api.greenhouse.io/v1/boards/via/jobs?utm_medium=email&utm_source=TakeHomeTest&content=true",
    }).then(function (response) {
      setJobs(response.data.jobs);
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

  // const newYork = jobs.filter((item) => item.location.name === "Sofia");

  //  const dataFilter = jobs.filter((item) => item.departments[0].name === "Data");

  let deptFilter = jobs.filter(
    (item) => item.departments[0].name === selection
  );

  let deptChecks = department.filter(
    (item) => item.id === deptSelect
  );
  // console.log(deptFilter);

  // console.log(newYork);
  // console.log(dataFilter);

  //write function for if department on left is selected equals jobs.data.departments, filter

  return (
    <div className="App">
      {/* <div>
        {newYork.map((item, index) => {
          console.log(newYork);
          return <li key={index}>{item.title}</li>;
        })}
      </div> */}
      <div className="flex flex-row">
        <div>
          {department.map((item, index) => {
            return (
              <>
                <ul>
                  <form>
                    {/* {console.log("selection-id", selection)} */}
                    <li key={index} className={checked ? `text-blue-400` : `text-gray-400`}>
                      {/* <button
                        id={`checkbox-${item.index}`}
                        onClick={() => setClicked(item.id)}
                      > */}
                        {/* {console.log(clicked)} */}
                        <input
                          type="checkbox"
                          onClick={() => setSelection(item.name)}
                          
                          checked={checked}
                          onChange={e => ((e.target.id = item.id ? setChecked(e.target.checked) : null))}
                          id={item.id}
                          className="check-radio bg-blue text-blue"
                        />
                        {item.name}
                      {/* </button> */}
                    </li>
                  </form>
                </ul>
              </>
            );
          })}
        </div>
        <div>
          {/* {jobs.filter((item) => item.departments[0].name === selection)} */}
          {selection === null ? (
            <>
              {jobs.map((item, index) => {
                // console.log(jobs);
                return <li key={index}>{item.title}</li>;
              })}
            </>
          ) : (
            <>
              {/* {deptFilter.map((item, index) => {
                // console.log(jobs);
                return (
                  <li key={index}>
                    <div>
                        <h1 className="text-2xl">{item.title}</h1>
                        <h2 className="text-xl">{item.departments[0].name}</h2>
                        <p className="text-sm">{parse(decode(item.content))}</p>
                      <a
                        target="_blank"
                        href={item.absolute_url}
                        alt={`${item.title} job application link`}
                      >
                        Apply Now
                      </a>
                        <h5>{item.location.name}</h5>
                    </div>
                  </li>
                );
              })} */}
              <AccordionPage data={deptFilter} />
            </>
          )}
          {/* {jobs.map((item, index) => {
            // console.log(jobs);
            return <li key={index}>{item.title}</li>;
          })}
          {
            deptFilter.map((item, index) => {
            // console.log(jobs);
            return <li key={index}>{item.title}</li>;
          })} */}
        </div>
      </div>
      {/* <AccordionPage data={jobs} /> */}
    </div>
  );
};

export default Home;
