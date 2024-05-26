import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addReadings, getAMeterReadings } from "../../api/meter";
import Title from "../shared/Title";
import Button from "../shared/Button";
import InputField from "../shared/InputField";
import Icon from "@mdi/react";
import { mdiClose, mdiPlus } from "@mdi/js";

function MeterDetailsComponent() {
  // Get meterId from params
  const { meterId } = useParams();
  const [meterDetails, setMeterDetails] = useState([]);
  const [modelOpen, setModalOpen] = useState(false);
  const [readings, setReadings] = useState([
    {
      time: "",
      reading: null,
    },
  ]);

  useEffect(() => {
    getAMeterReadings(meterId)
      .then((res) => {
        setMeterDetails(res.data.data.electricityReadings);
        // Opening the modal if there are no readings
        if(res.data.data.electricityReadings.length === 0) setModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangeValue = (name, value, index) => {
    const readingsCopy = JSON.parse(JSON.stringify(readings));
    if (name === "reading") readingsCopy[index][name] = value;
    else {
      // Convert the date string to a Date object
      const date = new Date(value);
      // Get the epoch timestamp in seconds
      const epochTimestamp = Math.floor(date.getTime() / 1000);
      readingsCopy[index][name] = epochTimestamp;
    }
    setReadings(readingsCopy);
  };

  const saveReadings = () => {
    addReadings({ smartMeterId: meterId, electricityReadings: readings })
      .then((res) => {        
        setMeterDetails(res.data.data.electricityReadings);
        setModalOpen(false);
        setReadings([
          {
            time: "",
            reading: null,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
        setModalOpen(false);
      });
  };

  return (
      <section className="py-1 bg-blueGray-50">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <Title
                    title={meterId}
                    className={"font-semibold -ml-2"}
                  />
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <Button
                    text={"Add reading"}
                    functionToCall={() => setModalOpen(true)}
                  />
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Date (GMT)
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Epoch timestamp
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Reading
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {meterDetails.map((reading) => (
                    <tr key={reading.time}>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(reading.time * 1000).toLocaleDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {reading.time}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {reading.reading}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {modelOpen && (
          <div className="w-full h-screen bg-black fixed z-50 top-0 left-0 bg-opacity-20 flex flex-col justify-center items-center">
            <div className=" w-[80%] md:w-2/3 lg:w-1/3 max-h-[80vh] overflow-y-scroll bg-white rounded-md p-4">
              <div className="flex justify-between">
                <Title
                  title={"Add Readings"}
                  className={"font-semibold mb-4"}
                />
                <Icon
                  path={mdiClose}
                  size={1.4}
                  className={
                    "mt-2 text-teal-800 cursor-pointer rounded-full p-1"
                  }
                  onClick={() => setModalOpen(false)}
                />
              </div>
              {readings.map((reading, index) => (
                <div className="flex gap-2 items-center" key={index}>
                  <InputField
                    label={"Date"}
                    type={"date"}
                    name={"time"}
                    // inputValue={reading.time}
                    setInputValue={(name, value) =>
                      handleChangeValue(name, value, index)
                    }
                    // help={"Choose the date"}
                    w={"w-full"}
                  />

                  <InputField
                    label={"Reading"}
                    type={"number"}
                    name={"reading"}
                    inputValue={reading.reading}
                    setInputValue={(name, value) =>
                      handleChangeValue(name, value, index)
                    }
                    // help={"Enter the reading"}
                    w={"w-full"}
                  />
                  <Icon
                    path={index >= 1 ? mdiClose : ""}
                    size={2.4}
                    className={`mt-4 text-teal-800  ${
                      index >= 1 ? "cursor-pointer" : ""
                    } p-1`}
                    onClick={() =>
                      index >= 1 &&
                      setReadings(readings.filter((_, i) => i !== index))
                    }
                  />
                </div>
              ))}

              <div className="flex w-full justify-end gap-4 mt-8">
                <Icon
                  path={mdiPlus}
                  size={1.4}
                  className={
                    "mt-2 text-teal-800 cursor-pointer bg-gray-100 rounded-full p-1"
                  }
                  onClick={() =>
                    setReadings([...readings, { time: "", reading: "" }])
                  }
                />
                <Button
                  text={"Save"}
                  functionToCall={saveReadings}
                  className={"mt-4"}
                />
              </div>
            </div>
          </div>
        )}
      </section>
    )
}

export default MeterDetailsComponent;
