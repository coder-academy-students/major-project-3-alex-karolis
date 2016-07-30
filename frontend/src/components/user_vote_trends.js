import React, { Component } from 'react';
import { Sparklines, SparklinesBars, SparklinesReferenceLine } from 'react-sparklines';
import moment from 'moment';

export default (props) => {

  function finalNumber(arr) {
    return arr[arr.length - 1];
  }
  const month = new Date();
  month.setDate(month.getDate()-30);

  const week = new Date();
  week.setDate(week.getDate()-7);

  const day = new Date();
  day.setDate(day.getDate()-1);

  const all = new Date();
  all.setDate(all.getDate()-99999);

  function runningTotal (votesArrays, range) {
    let total = 0;
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
              <SparklinesBars style={{ fill: "blue" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, all))} votes</div>
          </td>
          <td>
            <Sparklines height={100} width={120} data={runningTotal(props.data, month)}>
              <SparklinesBars style={{ fill: "green" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, month)) || 0} votes this month</div>
          </td>
          <td>
            <Sparklines height={100} width={120} data={runningTotal(props.data, week)}>
              <SparklinesBars style={{ fill: "orange" }} />
              <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{finalNumber(runningTotal(props.data, week)) || 0} votes this week</div>
          </td>
          <td>
            <Sparklines
              height={100} width={120}
              data={runningTotal(props.data, day).length < 1 ? [1] : runningTotal(props.data, day)}>
              <SparklinesBars style={{ fill: "red" }} />
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