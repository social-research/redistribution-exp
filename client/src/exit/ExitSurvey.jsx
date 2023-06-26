import { usePlayer } from "@empirica/core/player/classic/react";
import React, { useState } from "react";
import { Button } from "../components/Button";

export function ExitSurvey({ next }) {
  const labelClassName = "block text-sm font-medium text-gray-700 my-2";
  const inlineLabelClassName = "block text-sm font-medium text-gray-700";
  const inputClassName =
    "appearance-none block w-300px px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const optionClassName =
    "appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-empirica-500 focus:border-empirica-500 sm:text-sm";
  const player = usePlayer();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [income, setIncome] = useState("");
  const [percentile, setPercentile] = useState("");
  const [awardFair, setAwardFair] = useState("");
  const [resultFair, setResultFair] = useState("");
  const [groupFeel, setGroupFeel] = useState("");
  const [rationale, setRationale] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault()
    player.set("exitSurvey", {
      age,
      gender,
      education,
      income,
      percentile,
      awardFair,
      resultFair,
      rationale,
      groupFeel
    });
    next();
  }

  const genderOptions = [
    {value: "female", label: "Female"},
    {value: "male", label: "Male"},
    {value: "other", label: "Other"},
  ];

  const educationOptions = [
    {value: "high-school", label: "High school or lower"},
    {value: "associate", label: "Associate's degree or some college"},
    {value: "bachelor", label: "Bachelor's degree"},
    {value: "master", label: "Master's degree or higher"},
  ];

  const incomeOptions = [
    {value: "1", label: "Less than $20,000"},
    {value: "2", label: "$20,000 - $39,999"},
    {value: "3", label: "$40,000 - $69,999"},
    {value: "4", label: "$70,000 - $99,999"},
    {value: "5", label: "$100,000 - $150,000"},
    {value: "6", label: "More than $150,000"},
  ];

  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range


  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <form
        className="mt-12 space-y-8 divide-y divide-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-2xl leading-6 font-medium text-gray-900">
                Exit Survey
              </h3>
              <p className="mt-1 text-gray-500">
                Please answer the short survey below. You do not have to
                provide any information you feel uncomfortable with.
              </p>
            </div>

            <div className="space-y-8 mt-6">
              <div className="flex flex-row">
                <label htmlFor="age" className={labelClassName}>
                  Age
                </label>
                <div className="ml-6">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="18"
                    max="100"
                    autoComplete="off"
                    className={inputClassName}
                    value={age}
                    style={{width:"165px"}}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <label htmlFor="gender" className={labelClassName}>
                  Gender
                </label>
                <div className="ml-6">
                  <Dropdown
                    value={gender}
                    options={genderOptions}
                    onChange={(e) => setGender(e.target.value)}
                    optionClassName={optionClassName}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <label htmlFor="education" className={labelClassName}>
                  Highest education qualification
                </label>
                <div className="ml-6">
                  <Dropdown
                    value={education}
                    options={educationOptions}
                    onChange={(e) => setEducation(e.target.value)}
                    optionClassName={optionClassName}
                  />
                </div>
              </div>
              

              <div className="flex flex-row">
                <label htmlFor="income" className={labelClassName}>
                  Household income
                </label>
                <div className="ml-6">
                  <Dropdown
                    value={income}
                    options={incomeOptions}
                    onChange={(e) => setIncome(e.target.value)}
                    optionClassName={optionClassName}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <label htmlFor="percentile" className={labelClassName}>
                  Considering all US households, what percent have higher income than yours?
                </label>
                <div className="ml-6">
                  <input
                    id="percentile"
                    name="percentile"
                    type="number"
                    min="1"
                    max="100"
                    autoComplete="off"
                    className={optionClassName}
                    value={percentile}
                    style={{width:"165px"}}
                    onChange={(e) => setPercentile(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row">

                <label htmlFor="awardFair" className={labelClassName}>
                    How fair were the initial awarded scores? 
                </label>

                <div className="flex flex-row ml-6">

                  <div className={labelClassName}>Completely unfair</div>

                  <div className="ml-2 mr-2">
                    <input
                      id="awardFair"
                      name="awardFair"
                      type="range"
                      min={-3}
                      step={1}
                      max={3}
                      className={optionClassName}
                      value={awardFair}
                      style={{width:"165px"}}
                      onChange={(e) => setAwardFair(e.target.value)}
                    />
                  </div>

                  <div className={labelClassName}>Completely fair</div>

                </div>
              </div>

              <div className="flex flex-row">

                <label htmlFor="resultFair" className={labelClassName}>
                    How fair were the final scores? 
                </label>

                <div className="flex flex-row ml-6">

                  <div className={labelClassName}>Completely unfair</div>

                  <div className="ml-2 mr-2">
                    <input
                      id="resultFair"
                      name="resultFair"
                      type="range"
                      min={-3}
                      step={1}
                      max={3}
                      className={optionClassName}
                      value={resultFair}
                      style={{width:"165px"}}
                      onChange={(e) => setResultFair(e.target.value)}
                    />
                  </div>
                  
                  <div className={labelClassName}>Completely fair</div>

                </div>
              </div>

              <div className="flex flex-row">
                <label className={labelClassName}>
                  Why did you vote the way you did?
                </label>
                <div className="ml-6">
                  <textarea
                    className={inputClassName}
                    dir="auto"
                    id="rationale"
                    name="rationale"
                    rows={3}
                    value={rationale}
                    onChange={(e) => setRationale(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-row">
                <label htmlFor="groupFeel" className={labelClassName}>
                    Overall, how do you feel about the other group members and their voting decisions? 
                </label>
                <div className="ml-6">
                  <textarea
                    className={inputClassName}
                    dir="auto"
                    id="groupFeel"
                    name="groupFeel"
                    width="200px"
                    rows={3}
                    value={groupFeel}
                    onChange={(e) => setGroupFeel(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-12">
                <Button type="submit">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export function Radio({ selected, name, value, label, onChange }) {
  return (
    <label className="text-sm font-medium text-gray-700">
      <input
        className="mr-2 shadow-sm sm:text-sm"
        type="radio"
        name={name}
        value={value}
        checked={selected === value}
        onChange={onChange}
      />
      {label}
    </label>
  );
}

export function Dropdown({ value, options, onChange, optionClassName }) {
  return (
      <div>
        <select value={value} 
                onChange={onChange} 
                className={optionClassName}>
        <option />{options.map((option) => {
          return <option key={option.value} value={option.value}>{option.label}</option>
        })}
        </select>
      </div>
    
  );
}

