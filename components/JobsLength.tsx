import { useEffect, useState } from "react";
import { AccordionPage } from "./Accordion";
import LottieAnimation from "./LottieAnimation";
import axios from "axios";

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

const JobsLength: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<Item[]>([]);

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
  }, []);
  return (
    <>
      {loading ? (
        <div>
          <LottieAnimation />
          rendering data from server... <br/>loading...
        </div>
      ) : (
        <AccordionPage data={jobs} />
      )}
    </>
  );
};

export default JobsLength;
