import React, { useState, useEffect } from "react";
import { decode } from "html-entities";
import parse from "html-react-parser";
import Aos from "aos";

export const AccordionPage = (props: any) => {
  const [itemsToShow, setItemsToShow] = useState(6);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    Aos.init();
  });

  return (
    <>
      <Accordion>
        {props.data.slice(0, itemsToShow).map((item: any, index: any) => {
          // console.log(jobs);
          return (
            <>
              <div className="cards__items" data-aos="fade-up">
                <AccordionItem
                  toggle={`panel-${index + 1}`}
                  className="bg-white text-black transition duration-500 ease-in-out hover:text-sky-700 accord"
                >
                  <h2 className="text-base text-gray-500 inter">
                    {item.departments[0].name}
                  </h2>
                  <h1 className="text-2xl">{item.title}</h1>
                </AccordionItem>
                <AccordionPanel id={`panel-${index + 1}`}>
                  <div className="inter">
                    <p className="text-sm px-6 py-4 overflow-scroll">
                      {parse(decode(item.content))}
                    </p>
                    <a
                      rel="noreferrer"
                      target="_blank"
                      href={item.absolute_url}
                      className="up py-2 button-width px-5 text-white flex justify-center button-color rounded-full lg:text-xl md:text-base sm:text-sm hover:bg-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex ..."
                    >
                      Apply Now
                    </a>
                  </div>
                </AccordionPanel>
                <h5 className="inter transition duration-500 ease-in-out border-b hover:border-sky-700 py-2">
                  <span className="flex flex-row">
                    <svg
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5931 8.37141C16.5931 8.35667 16.5931 8.34193 16.5931 8.32719C16.5931 8.31835 16.5931 8.30951 16.5931 8.30066C16.5931 3.92041 13.1978 0.33014 8.89482 0.0235811C8.88893 0.0235811 8.88304 0.0235811 8.87714 0.0235811C8.8182 0.0206334 8.75925 0.0147382 8.69736 0.0117905C8.67378 0.0117905 8.65315 0.00884268 8.62957 0.00884268C8.58536 0.005895 8.54115 0.00589509 8.49694 0.00294741C8.43505 -2.69851e-07 8.37316 0 8.31127 0C8.30537 0 8.29948 0 8.29358 0C8.2258 0 8.15506 -2.69851e-07 8.08728 0.00294741C8.05486 0.00294741 8.02244 0.00589527 7.99296 0.00589527C7.9576 0.00589527 7.92223 0.00884268 7.88686 0.00884268C7.83971 0.0117904 7.79255 0.0147381 7.74834 0.0176858C7.72771 0.0176858 7.71003 0.0206337 7.6894 0.0206337C7.63045 0.0235813 7.57445 0.0294767 7.51845 0.0353721C7.50961 0.0353721 7.50372 0.0353718 7.49488 0.0383195C3.28914 0.442151 0 3.98526 0 8.29772C0 8.3213 0 8.34488 0 8.37141C0.00884177 10.4908 0.810496 12.6161 2.42854 14.2225C4.11142 15.8939 8.29653 20 8.29653 20C8.29653 20 12.5848 15.7878 14.1616 14.2225C15.3198 13.073 16.0537 11.6551 16.3868 10.1724C16.3838 10.1754 16.3809 10.1813 16.3779 10.1842C16.5105 9.61238 16.5842 9.01695 16.5931 8.40678C16.5931 8.39499 16.5931 8.3832 16.5931 8.37141Z"
                        fill="#00A8E2"
                      />
                    </svg>
                    <p className="px-2 text-sm">{item.location.name}</p>
                  </span>
                </h5>
                {/* <li key={index}>{item.title}</li> */}
              </div>
            </>
          );
        })}
      </Accordion>
      {console.log(props.data.length)}
      {console.log(itemsToShow)}
      {itemsToShow >= props.data.length ? (
        <></>
      ) : (
        <button className="up mt-4 py-2 button-width px-5 text-white flex justify-center button-color rounded-full lg:text-xl md:text-base sm:text-sm hover:bg-blue-300 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 flex ..." data-aos="fade-up" onClick={() => setItemsToShow(itemsToShow + 6)}>expand</button>
      )}
    </>
  );
};

/* Logic */

const Context = React.createContext({});

function Accordion({ children }: any) {
  const [selected, setSelected] = React.useState();

  const toggleItem = React.useCallback(
    (id) => () => {
      setSelected((prevState) => (prevState !== id ? id : ""));
    },
    []
  );
  return (
    <Context.Provider value={{ selected, toggleItem }}>
      {children}
    </Context.Provider>
  );
}

//custom hook to consume all accordion values
const useAccordion = () => React.useContext(Context);

const style = {
  item: `block focus:outline-none my-2 py-3`,
  panel: `overflow-hidden md:overflow-x-hidden transition-height ease duration-300 text-gray-600`,
};

function AccordionItem({ toggle, children, className }: any) {
  const { selected, toggleItem }: any = useAccordion();
  return (
    <div
      role="button"
      onClick={toggleItem(toggle)}
      className={`${style.item} ${className}`}
    >
      {children}
      <span className="float-right">
        {selected === toggle ? <AngleUpIcon /> : <AngleDownIcon />}
      </span>
    </div>
  );
}

function AccordionPanel({ children, id }: any) {
  const { selected }: any = useAccordion();
  const ref: any = React.useRef();
  const inlineStyle =
    selected === id ? { height: ref.current?.scrollHeight } : { height: 0 };

  return (
    <div ref={ref} id={id} className={style.panel} style={inlineStyle}>
      {children}
    </div>
  );
}

const AngleUpIcon = () => (
  <svg
    fill="white"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 h-4"
  >
    <path d="M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" />
  </svg>
);

const AngleDownIcon = () => (
  <svg
    stroke="currentColor"
    fill="white"
    strokeWidth="0"
    viewBox="0 0 320 512"
    xmlns="http://www.w3.org/2000/svg"
    className="mt-1 h-4"
  >
    <path d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" />
  </svg>
);
