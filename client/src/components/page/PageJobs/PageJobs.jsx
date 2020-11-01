/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import qs from "qs";
import debounce from "lodash.debounce";
import { requestJobs } from "../../../actions/jobs/jobsActions";
import List from "../../ui/List/List";

const JobContainer = styled.div``;

const listHeader = ["Status", "Name"];

const excludeFields = ["_id", "processId"];

const PageJobs = ({ fetchJobs, jobs }) => {
  const [searchString, onChangeSearchString] = useState("");
  const getJobs = useCallback(
    debounce((search) => {
      fetchJobs(search);
    }, 1000),
    []
  );
  const handleChaneSearch = (event) => {
    onChangeSearchString(event.target.value);
    getJobs(event.target.value);
  };

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <JobContainer>
      <input type="text" value={searchString} onChange={handleChaneSearch} />
      <List data={jobs} header={listHeader} excludeFields={excludeFields} />
    </JobContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.jobs,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchJobs: (search) => {
    const params = qs.parse(props.location.search, { ignoreQueryPrefix: true });
    dispatch(requestJobs({ params: { ...params, search } }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageJobs);
