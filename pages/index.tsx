import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";

// const axios = require("axios");

interface Props {
  data?: any;
  goodResponse?: any;
  jobs?: any;
}

const Home: NextPage<Props> = () => {
  const [jobs, setJobs] = useState([]);
  const [department, setDepartment] = useState([]);
  const [selection, setSelection] = useState([]);
  const [checked, setChecked] = useState(false);
  

  function toggle(value){
    return !value;
  }

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
      url:
        "https://boards-api.greenhouse.io/v1/boards/via/departments/?utm_medium=email&utm_source=TakeHomeTest&render_as=tree"
    }).then(function (response) {
      setDepartment(response.data.departments);
      // console.log(response);
    });
  }, []);

  // console.log(jobs);

  // const newYork = jobs.filter((item) => item.location.name === "Sofia");

  //  const dataFilter = jobs.filter((item) => item.departments[0].name === "Data");

  let deptFilter = jobs.filter((item) => item.departments[0].name === selection);
  console.log(deptFilter);

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
                <li key={index}><input type="checkbox" onClick={() => setSelection(item.name)} checked={checked} onChange={() => setChecked(toggle)} className="check-radio"/>{item.name}</li>
                
                </form>
                </ul>
              </>
            );
          })}
        </div>
        <div>
          {/* {jobs.filter((item) => item.departments[0].name === selection)} */}
          {/* {jobs.map((item, index) => {
            // console.log(jobs);
            return <li key={index}>{item.title}</li>;
          })} */}
          {
            deptFilter.map((item, index) => {
            // console.log(jobs);
            return <li key={index}>{item.title}</li>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
