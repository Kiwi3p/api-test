import type { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

import "aos/dist/aos.css";
import Checkboxes from "../components/Checkboxes";
import Head from "next/head";

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

  //write function for if department on left is selected equals jobs.data.departments, filter

  return (
    <div className="App">
      <Head>
        <title>Greenhouse Api Test</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Checkboxes data={department} />
    </div>
  );
};

export default Home;
