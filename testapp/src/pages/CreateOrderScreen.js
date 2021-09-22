import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiClient } from "../axios";
import {
  DELIVERY_TYPES,
  PRODUCT_TYPES,
  WEIGHT_TYPES,
} from "../helpers/constants";
import { Service } from "../service";

function CreateOrderScreen() {
  const [state, setState] = useState({
    stores: [],
    cities: [],
    areas: [],
    zones: [],
    success: false,
  });

  useEffect(() => {
    fetchAllData();
  }, []);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    Service.submitOrder(data);
  };

  const fetchAllData = async () => {
    let datas = await Promise.all([
      Service.getStoreList(),
      Service.getAreaList(),
      Service.getCityList(),
      Service.getZoneList(),
    ]);
    setState({
      ...state,
      stores: datas[0],
      areas: datas[1],
      cities: datas[2],
      zones: datas[3],
    });
  };

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Store
            </label>
            <div class="relative">
              <select
                {...register("store_id")}
                class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {state.stores.map((e) => (
                  <option value={e.store_id}>{e.store_name}</option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>{" "}
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-state"
            >
              Product Type
            </label>
            <div class="relative">
              <select
                {...register("item_type")}
                class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
              >
                {PRODUCT_TYPES.map((e) => (
                  <option value={e.id}>{e.name}</option>
                ))}
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/3 px-3">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="merchantOrderId"
            >
              Merchant Order ID
            </label>
            <input
              {...register("merchant_order_id")}
              class="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="merchantOrderId"
              placeholder="Type ID (optional)"
            />
          </div>
        </div>
        {/* first row end */}
        {/* second row */}
        <div className="md:flex block flex-wrap -mx-3">
          <div class="md:w-1/2 px-3">
            <h1> Recipient Details</h1>
            <div class="flex flex-wrap -mx-3 my-6">
              <div class="w-full  px-3 mb-6 md:mb-0">
                {" "}
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="recipentName"
                >
                  Recipent's name
                </label>
                <input
                  {...register("recipient_name")}
                  class="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="recipentName"
                  placeholder="Type Name"
                />
              </div>
            </div>
            {/* second row end */}
            {/* trund row */}
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="recipentphone"
                >
                  Recipent's phone
                </label>
                <input
                  {...register("recipient_phone")}
                  class="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="recipentphone"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            {/* trund row end */}
            {/* 4th row */}
            <div class="flex flex-wrap -mx-3 mb-6">
              <label
                class="pl-3 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="recipentphone"
              >
                Delivery Address
              </label>
              <div class="w-full px-3 mb-6 md:mb-0 flex ">
                <div className="w-1/3  pr-3">
                  <div class="relative">
                    <select
                      {...register("recipient_city")}
                      class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option selected="true" disabled="disabled" value={-1}>
                        City
                      </option>
                      {state.cities.map((e) => (
                        <option value={e.city_id}>{e.city_name}</option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 ">
                  <div class="relative">
                    <select
                      {...register("recipient_area")}
                      class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                    >
                      <option selected="true" disabled="disabled" value={-1}>
                        Area
                      </option>
                      {state.zones.map((e) => (
                        <option value={e.zone_id}>{e.zone_name}</option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="w-1/3 pl-3">
                  <div class="relative">
                    <select
                      {...register("recipient_city")}
                      class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="city"
                    >
                      <option selected="true" disabled="disabled" value={-1}>
                        Zone
                      </option>
                      {state.areas.map((e) => (
                        <option value={e.area_id}>{e.area_name}</option>
                      ))}
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        class="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* 5th row */}
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                {" "}
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Recipent's address
                </label>
                <textarea
                  {...register("recipient_address")}
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>

          <div class="md:w-1/2 px-3 ">
            <h1> Delivery Details</h1>
            <div class="flex flex-wrap -mx-3 my-6">
              <div class="w-full  px-3 mb-6 md:mb-0">
                {" "}
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="recipentName"
                >
                  Delivery Type
                </label>
                <div class="relative">
                  <select
                    {...register("delivery_type")}
                    class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="city"
                  >
                    {DELIVERY_TYPES.map((e) => (
                      <option value={e.id}>{e.name}</option>
                    ))}
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* second row end */}
            {/* trund row */}
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full mb-6  md:mb-0">
                <div className="flex">
                  <div className="w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="recipentName"
                    >
                      Total Weight
                    </label>
                    <div class="relative">
                      <select
                        {...register("item_weight")}
                        class="block appearance-none w-full   border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="city"
                      >
                        {WEIGHT_TYPES.map((e) => (
                          <option value={e.id}>{e.name}</option>
                        ))}
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="recipentName"
                    >
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register("item_quantity")}
                      class="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-password"
                      placeholder="Enter Quantity"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* trund row end */}
            {/* 4th row */}
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3 mb-6 md:mb-0">
                {" "}
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Amount to Collect
                </label>
                <input
                  {...register("amount_to_collect")}
                  class="appearance-none block w-full   text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  placeholder="Enter amount in BDT"
                />
              </div>
            </div>
            {/* 5th row */}
            <div class="flex flex-wrap -mx-3 ">
              <div class="w-full px-3 mb-6 md:mb-0">
                {" "}
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  {"Item Description & Price"}
                </label>
                <textarea
                  {...register("item_description")}
                  class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="w-full px-3 mb-6 md:mb-0">
            {" "}
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-password"
            >
              {"Special Instructions"}
            </label>
            <textarea
              {...register("special_instruction")}
              class="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              rows="4"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateOrderScreen;
