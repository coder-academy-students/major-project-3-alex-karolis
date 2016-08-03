import React, { Component } from 'react';
import { Sparklines, SparklinesCurve, SparklinesReferenceLine } from 'react-sparklines';
import moment from 'moment';

export default (props) => {

  const month = new Date();
  month.setDate(month.getDate()-30);

  const week = new Date();
  week.setDate(week.getDate()-7);

  const day = new Date();
  day.setDate(day.getDate()-1);

  const all = new Date();
  all.setDate(all.getDate()-99999);

  function finalNumber(arr) {
    return arr[arr.length - 1];
  }

  function startValue (votesArrays, range) {
    // Get the starting value for the votes array sent to SparkLines
    // by calculating the starting vote count.
    return votesArrays.reduce((outerRunTotal, votesArray) => {
        return outerRunTotal + votesArray.reduce((innerRunTotal, vote) => {
            if(moment(vote.createdAt).isBefore(range)) {
              if (vote.upVote) return innerRunTotal + 1;
              else return innerRunTotal - 1;
            }
          },0);
      },0) || 0;
  }

  function runningTotal (votesArrays, range) {
    let total = startValue(votesArrays, range);
    const arr = votesArrays.map(votesArray => votesArray.map(vote => {
      if (moment(vote.createdAt).isAfter(range)) {
        if (vote.upVote) {
          return ++total;
        } else {
          return --total;
        }
      }
      return null;
    }));
    return [].concat.apply([], arr).filter(Boolean);
  }

  return (
    <div>
      <h2 className="center-text">Voting Trends</h2>
      <table className="table table-hover">
        <thead>
        <tr>
          <th>All votes</th>
          <th>This month</th>
          <th>This week</th>
          <th>Today</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <Sparklines height={100} width={120} data={runningTotal(props.data, all)}>
              <SparklinesCurve style={{ fill: "blue" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, all))} votes</div>
          </td>
          <td>
            <Sparklines height={100} width={120} data={runningTotal(props.data, month)}>
              <SparklinesCurve style={{ fill: "green" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, month)) || 0} votes this month</div>
          </td>
          <td>
            <Sparklines height={100} width={120} data={runningTotal(props.data, week)}>
              <SparklinesCurve style={{ fill: "orange" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, week)) || 0} votes this week</div>
          </td>
          <td>
            <Sparklines
              height={100} width={120}
              data={runningTotal(props.data, day)}>
              <SparklinesCurve style={{ fill: "red" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, day)) || 0} votes today</div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}