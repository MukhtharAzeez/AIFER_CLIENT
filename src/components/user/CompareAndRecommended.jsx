import { useEffect, useState } from "react";
import Title from "../shared/Title";
import {
  comparePricePlan,
  getAllMeters,
  recommendedPricePlans,
} from "../../api/meter";
import EmptyComponent from "../shared/EmptyComponent";
import Icon from "@mdi/react";
import { mdiMenuDown } from "@mdi/js";
import { useSharedStore } from "../../contexts/AlertContext";

function CompareAndRecommended() {
  const { setIsLoading } = useSharedStore();

  const [meters, setMeters] = useState([]);
  const [selectedMeter, setSelectedMeter] = useState("");
  const [comparedPricePlans, setComparedPricePlans] = useState({});
  const [recommendedPricePlan, setRecommendedPricePlan] = useState([]);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllMeters()
      .then((res) => {
        setMeters(res.data.data);
        setSelectedMeter(res.data?.data?.[0]?._id);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedMeter) return;
    setIsLoading(true);
    comparePricePlan(selectedMeter)
      .then((res) => {
        setComparedPricePlans(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setComparedPricePlans({});
        setIsLoading(false);
      });

    setIsLoading(true);
    recommendedPricePlans(selectedMeter)
      .then((res) => {
        setRecommendedPricePlan(res.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setRecommendedPricePlan([]);
        setIsLoading(false);
      });
  }, [selectedMeter]);

  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto">
        <Title
          title="Compare and Recommended Price plans"
          className={"font-medium my-1 mb-4 ml-5"}
        />
        {meters.length ? (
          <>
             {/* Dropdowns shown only on small screen */}
            <div
              className="md:hidden relative w-[210px] h-12 my-2 rounded-lg bg-white flex justify-evenly items-center"
              onClick={() => setIsDropdownActive(!isDropdownActive)}
            >
              <Title title={selectedMeter} className="text-indigo-400" />
              <Icon path={mdiMenuDown} size={1} className="text-indigo-400" />
              {isDropdownActive && (
                <div className="absolute top-12 z-10 left-0 w-[210px] bg-black">
                  {meters.map((meter, index) => (
                    <div
                      className={`w-full p-4 px-5 bg-white border-2 border-white ${
                        selectedMeter === meter._id && "border-r-indigo-400"
                      } cursor-pointer`}
                      key={index}
                      onClick={() => setSelectedMeter(meter._id)}
                    >
                      <Title title={meter._id} className="" />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex min-w-0 break-words w-full mb-6 rounded justify-between">
              {/* List of meters in big screen */}
              <div className="w-full hidden md:w-[24%] md:block">
                {meters.map((meter, index) => (
                  <div
                    className={`w-full p-4 px-5 bg-white border-2 border-white ${
                      selectedMeter === meter._id && "border-r-indigo-400"
                    } cursor-pointer`}
                    key={index}
                    onClick={() => setSelectedMeter(meter._id)}
                  >
                    <Title title={meter._id} className="" />
                  </div>
                ))}
              </div>

              <div className="w-full md:w-[75%] h-full bg-white flex gap-10 flex-wrap">
                {/* Table that displays the price plan comparisons */}
                <div className="w-[40%] min-w-[300px]">
                  <Title
                    title="Compare Price Plans"
                    className="ml-5 my-4 font-semibold"
                  />
                  {comparedPricePlans?.pricePlanComparisons?.length ? (
                    <table className="items-center bg-transparent w-full border-collapse ">
                      <thead>
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Price Plan
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparedPricePlans?.pricePlanComparisons?.map(
                          (val, index) => (
                            <tr key={index}>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {Object.keys(val)[0]}
                              </td>
                              <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {val[Object.keys(val)[0]]}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyComponent minHeight={"min-h-[180px]"} />
                  )}
                </div>

                <div className="w-[40%] min-w-[300px]">
                  <Title
                    title="Recommended Price Plans"
                    className="ml-5 my-4 font-semibold"
                  />
                  {recommendedPricePlan.length ? (
                    <table className="items-center bg-transparent w-full border-collapse ">
                      <thead>
                        <tr>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Price Plan
                          </th>
                          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Rate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {recommendedPricePlan?.map((val, index) => (
                          <tr key={index}>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {Object.keys(val)[0]}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                              {val[Object.keys(val)[0]]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <EmptyComponent minHeight={"min-h-[180px]"} />
                  )}
                </div>
                <div className="w-[49%]"></div>
              </div>
            </div>
          </>
        ) : (
          <EmptyComponent minHeight={"min-h-[180px]"}/>
        )}
      </div>
    </section>
  );
}

export default CompareAndRecommended;
