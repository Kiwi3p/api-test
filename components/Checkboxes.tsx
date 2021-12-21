import { useEffect, useState } from "react";
import axios from "axios";
import { AccordionPage } from "./Accordion";
import LottieAnimation from "./LottieAnimation";

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

const Checkboxes: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState(true);
  // With this useState I wan't to collect the checked checkboxes
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [jobs, setJobs] = useState<Item[]>([]);
  const [department, setDepartment] = useState<Item[]>([]);

  // This is my handler method that gets triggered when a checkbox get's checked/unchecked
  // ..and toggles the state of the checkbox
  const handleCheckboxChange = (data:any) => {
    const isChecked = checkedCheckboxes.some(
      (checkedCheckbox:any) => checkedCheckbox.name === data.name
    );
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          (checkedCheckbox:any) => checkedCheckbox.name !== data.name
        )
      );
    } else {
      setCheckedCheckboxes(checkedCheckboxes.concat(data));
    }
  };

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

  const receivedData = props.data;
  let processedData = (checkedCheckboxes.map((data) => data));
  console.log("check processed -", processedData);

  //   let checkFilterHardCode = ( jobs[1].departments[0].name === processedData[0]);
//   let checkFilter = jobs.filter(
//     (item) =>
//       item.departments[0].name ===
//       processedData.includes(item.departments[0].name)
//   );

  const myArrayFiltered = jobs.filter((el):any => {
    return processedData.some((f:any) => {
      return f.name === el.departments[0].name;
    });
  });

//   console.log("check checkBoxes -", processedData);
//   // console.log("check filter -", checkFilterHardCode);
//   console.log("check filter -", myArrayFiltered);
//   console.log("check jobs -", jobs);

  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <div className="lg:m-20 p-5 lg:w-96">
          <h1 className="inter text-base mb-4">Departments</h1>
          <ul>
            {receivedData?.map((data:any, index:any) => {
              return (
                <>
                  {/* {console.log("selection-id", selection)} */}
                  <li key={index}>
                    <label
                      id={data.id}
                      className="check-container center-radio"
                    >
                      <input
                        key={`cb-${index}`}
                        value={data.value}
                        type="checkbox"
                        checked={checkedCheckboxes.some(
                          (checkedCheckbox:any) =>
                            checkedCheckbox.name === data.name
                        )}
                        onChange={() => handleCheckboxChange(data)}
                      />
                      <span className="checkmark"></span>
                      <span className="lg:whitespace-nowrap text-sm relative bt-2px">
                        {data.name}
                      </span>
                    </label>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <div className="my-20 lg:mr-32 view-width">
        {loading ? (
            <div>
              <LottieAnimation />
              Loading
            </div>
          ) : (
            <>
            {console.log("array-length" ,checkedCheckboxes.length)}
              {(checkedCheckboxes.length === 0) ? (
                <>
                  <AccordionPage data={jobs} />
                </>
              ) : (
                <>
                  <AccordionPage data={myArrayFiltered} />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkboxes;
