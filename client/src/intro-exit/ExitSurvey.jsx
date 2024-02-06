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
  const sliderClassName =
    "w-160px px-0 py-2";
  const player = usePlayer();

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [race, setRace] = useState("");
  const [education, setEducation] = useState("");
  const [religion, setReligion] = useState("");
  const [politics, setPolitics] = useState("");
  const [income, setIncome] = useState("");
  const [percentile, setPercentile] = useState("");
  const [awardSatisfied, setAwardSatisfied] = useState("");
  const [awardDistributionFair, setAwardDistributionFair] = useState("");
  const [resultSatisfied, setResultSatisfied] = useState("");
  const [resultDistributionFair, setResultDistributionFair] = useState("");
  const [rationale, setRationale] = useState("");
  const [groupFeel, setGroupFeel] = useState("");
  
  function handleSubmit(event) {
    event.preventDefault()
    player.set("exitSurvey", {
      age,
      gender,
      race,
      education,
      religion,
      politics,
      income,
      percentile,
      awardSatisfied,
      awardDistributionFair,
      resultSatisfied,
      resultDistributionFair,
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

  const raceOptions = [
    {value: "white", label: "White"},
    {value: "black", label: "Black or African American"},
    {value: "asian", label: "Asian"},
    {value: "native", label: "American Indian or Alaska Native"},
    {value: "pacific", label: "Native Hawaiian or Other Pacific Islander"},
    {value: "hispanic", label: "Hispanic or Latino"},
    {value: "other", label: "Other"},
  ];

  const educationOptions = [
    {value: "high-school", label: "High school or lower"},
    {value: "associate", label: "Associate's degree or some college"},
    {value: "bachelor", label: "Bachelor's degree"},
    {value: "master", label: "Master's degree or higher"},
  ];

    const religionOptions = [
    {value: "protestant", label: "Protestant"},
    {value: "catholic", label: "Catholic"},
    {value: "mormon", label: "Mormon"},
    {value: "jewish", label: "Jewish"},
    {value: "muslim", label: "Muslim"},
    {value: "buddhist", label: "Buddhist"},
    {value: "other", label: "Other religion"},
    {value: "none", label: "No religion"},
  ];
  
  // How would you describe your political views?
  const politicsOptions = [
    {value: "-2", label: "Very liberal"},
    {value: "-1", label: "Leaning liberal"},
    {value: "0", label: "Moderate"},
    {value: "1", label: "Leaning conservative"},
    {value: "2", label: "Very conservative"},
    {value: "other", label: "Other"},
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
                    style={{width:"85px"}}
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
                <label htmlFor="race" className={labelClassName}>
                  Race and ethnicity
                </label>
                <div className="ml-6">
                  <Dropdown
                    value={race}
                    options={raceOptions}
                    onChange={(e) => setRace(e.target.value)}
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
                <label htmlFor="religion" className={labelClassName}>
                  Religion
                </label>
                <div className="ml-6">
                  <Dropdown
                    value={religion}
                    options={religionOptions}
                    onChange={(e) => setReligion(e.target.value)}
                    optionClassName={optionClassName}
                  />
                </div>
              </div>    

              
              <div className="flex flex-row">
                <label htmlFor="politics" className={labelClassName}>
                  Political views
                </label>
                <div className="ml-6">
                  <Dropdown
                    value={politics}
                    options={politicsOptions}
                    onChange={(e) => setPolitics(e.target.value)}
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
                  What percent of US households do you think have higher income than yours? (e.g., 20 means that your income is in the top 20%, 80 means that your income is in the bottom 20%)
                </label>
                <div className="ml-6 mr-2">
                  <input
                    id="percentile"
                    name="percentile"
                    type="number"
                    min="0"
                    max="100"
                    autoComplete="off"
                    className={optionClassName}
                    value={percentile}
                    style={{width:"85px"}}
                    onChange={(e) => setPercentile(e.target.value)}
                  />
                </div>
                <div className={labelClassName}>%</div>
              </div>


              <div className="flex flex-row">

                <label htmlFor="awardSatisfied" className={labelClassName}>
                    How satisfied were you with the score you were allocated at the beginning of the game? 
                </label>

                <div className="flex flex-row ml-10">
                  <div className={labelClassName}>Unsatisfied</div>
                  <div className="ml-2 mr-2">
                    <input
                      id="awardSatisfied"
                      name="awardSatisfied"
                      type="range"
                      min={-2}
                      step={1}
                      max={2}
                      className={sliderClassName}
                      value={awardSatisfied}
                      onChange={(e) => setAwardSatisfied(e.target.value)}
                      list="ticks"
                    /><datalist id="ticks">
                        <option>-2</option>
                        <option>-1</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </datalist>
                  </div>
                  <div className={labelClassName}>Satisfied</div>
                </div>

              </div>

              <div className="flex flex-row">

                <label htmlFor="awardDistributionFair" className={labelClassName}>
                    How fair was the allocation of scores (to you and others) at the beginning of the game? 
                </label>

                <div className="flex flex-row ml-10">
                  <div className={labelClassName}>Unfair</div>
                  <div className="ml-2 mr-2">
                    <input
                      id="awardDistributionFair"
                      name="awardDistributionFair"
                      type="range"
                      min={-2}
                      step={1}
                      max={2}
                      className={sliderClassName}
                      value={awardDistributionFair}
                      onChange={(e) => setAwardDistributionFair(e.target.value)}
                      list="ticks"
                    /><datalist id="ticks">
                        <option>-2</option>
                        <option>-1</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </datalist>
                  </div>
                  <div className={labelClassName}>Fair</div>

                </div>
              </div>

              <div className="flex flex-row">

                <label htmlFor="resultSatisfied" className={labelClassName}>
                  How satisfied are you with the post-tax score you obtained at the end of the game?   
                </label>

                <div className="flex flex-row ml-10">

                  <div className={labelClassName}>Unsatisfied</div>
                  <div className="ml-2 mr-2">
                    <input
                      id="resultSatisfied"
                      name="resultSatisfied"
                      type="range"
                      min={-2}
                      step={1}
                      max={2}
                      className={sliderClassName}
                      value={resultSatisfied}
                      onChange={(e) => setResultSatisfied(e.target.value)}
                      list="ticks"
                    /><datalist id="ticks">
                        <option>-2</option>
                        <option>-1</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </datalist>
                  </div>
                  <div className={labelClassName}>Satisfied</div>

                </div>
              </div>

              <div className="flex flex-row">

                <label htmlFor="resultDistributionFair" className={labelClassName}>
                   How fair is the final distribution of scores at the end of the game?   
                </label>

                <div className="flex flex-row ml-10">

                  <div className={labelClassName}>Unfair</div>
                  <div className="ml-2 mr-2">
                    <input
                      id="resultDistributionFair"
                      name="resultDistributionFair"
                      type="range"
                      min={-2}
                      step={1}
                      max={2}
                      className={sliderClassName}
                      value={resultDistributionFair}
                      onChange={(e) => setResultDistributionFair(e.target.value)}
                      list="ticks"
                    /><datalist id="ticks">
                        <option>-2</option>
                        <option>-1</option>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                    </datalist>
                  </div>
                  <div className={labelClassName}>Fair</div>

                </div>
                </div>

              <div className="flex flex-row">
                <label className={labelClassName}>
                  What was the reason for your voting decisions in the game?
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

              <div className="mb-20">
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

