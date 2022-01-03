import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { AccordionPage } from "./Accordion";

const JobsLength = dynamic(() => import("./JobsLength"), {
  loading: () => (
    <p>
      loacting data from server... <br />
      loading...
    </p>
  ),
});

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
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // With this useState I wan't to collect the checked checkboxes
  const [checkedCheckboxes, setCheckedCheckboxes] = useState([]);
  const [jobs, setJobs] = useState<Item[]>([]);
  const [department, setDepartment] = useState<Item[]>([]);

  // This is my handler method that gets triggered when a checkbox get's checked/unchecked
  // ..and toggles the state of the checkbox
  const handleCheckboxChange = (data: any) => {
    const isChecked = checkedCheckboxes.some(
      (checkedCheckbox: any) => checkedCheckbox.name === data.name
    );
    if (isChecked) {
      setCheckedCheckboxes(
        checkedCheckboxes.filter(
          (checkedCheckbox: any) => checkedCheckbox.name !== data.name
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

  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  const receivedData = props.data;
  let processedData = checkedCheckboxes.map((data) => data);
  console.log("check processed -", processedData);

  const myArrayFiltered = jobs.filter((el): any => {
    return processedData.some((f: any) => {
      return f.name === el.departments[0].name;
    });
  });

  return (
    <>
      <div className="flex lg:flex-row flex-col">
        <div className="display-mobile flex justify-end mt-4">
          <div className="flex justify-end">

          <button
            onClick={toggle}
            className="text-white focus:outline-none m-1.5 rounded px-6 py-2 font-medium button-color hover:bg-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
          >
            Filter Departments
          </button>
          </div>
          <Menu open={open}>
            <button
              aria-label="Close"
              className="absolute top-3 right-3 text-5xl text-white cursor-pointer"
              onClick={toggle}
            >
              &times;
            </button>
            <div className="via-blue text-white lg:mx-20 lg:my-8 p-5 lg:w-96">
              <div>
                <h1 className="text-white inter text-2xl mb-4">Departments</h1>
                <ul className="overflow-scroll">
                  {receivedData?.map((data: any, index: any) => {
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
                                (checkedCheckbox: any) =>
                                  checkedCheckbox.name === data.name
                              )}
                              onChange={() => handleCheckboxChange(data)}
                            />
                            <span className="checkmark"></span>
                            <span className="lg:whitespace-nowrap text-xl relative bt-2px">
                              {data.name}
                            </span>
                          </label>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Menu>
        </div>
        <div className="display-desktop lg:mx-20 lg:my-8 p-5 lg:w-96">
          <div>
            <div className="lg:fixed">
              <h1 className="inter text-base mb-4">Departments</h1>
              <ul className="overflow-scroll">
                {receivedData?.map((data: any, index: any) => {
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
                              (checkedCheckbox: any) =>
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
          </div>
        </div>
        <div className="lg:my-20 my-6 lg:mr-32 view-width">
          {loading ? (
            <div>loading...</div>
          ) : (
            <>
              {console.log("array-length", checkedCheckboxes.length)}
              {checkedCheckboxes.length === 0 ? (
                <>
                  <JobsLength />
                  {/* <AccordionPage data={jobs} /> */}
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

//////curatin menu ///////
/* Logic*/
const style = {
  container: `relative top-1/4 w-full text-center mt-8`,
  item: `text-3xl text-gray-400 cursor-pointer hover:text-white`,
  menu: {
    open: `h-full w-full `,
    close: `w-0 h-full`,
    default: `overflow-x-hidden md:overflow-hidden transition-all duration-700 fixed z-10 top-0 left-0 bg-black`,
  },
};

function Menu({ children, open }: any) {
  return (
    <div
      className={`${style.menu.default} 
       ${open ? style.menu.open : style.menu.close}`}
    >
      {children}
    </div>
  );
}

function MenuContainer({ children }: any) {
  return <div className={style.container}>{children}</div>;
}

function MenuItem({ children, href }: any) {
  return (
    <div className="p-2">
      <a href={href} className={style.item}>
        {children}
      </a>
    </div>
  );
}

export default Checkboxes;
