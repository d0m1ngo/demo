/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import { requestJobs } from "../../../actions/jobs/jobsActions";
import useSort from "../../../hooks/useSort";
import List from "../../ui/List/List";

const JobContainer = styled.div``;
const JobInput = styled.input`
  margin: 20px;
`;
const JobLabel = styled.label``;

const listHeader = ["status", "name"];

const excludeFields = ["_id", "processId"];

const PageJobs = ({ fetchJobs, jobs }) => {
  const [searchString, handleSearchString] = useState("");
  const [sortBy, onChangeSort] = useSort({});
  const getJobs = useCallback(
    debounce((search) => {
      fetchJobs({ search, sortBy });
    }, 1000),
    []
  );
  const onChangeSearchString = (event) => {
    handleSearchString(event.target.value);
    getJobs(event.target.value);
  };

  useEffect(() => {
    fetchJobs({ search: searchString, sortBy });
  }, [fetchJobs, sortBy]);
  return (
    <JobContainer>
      <JobLabel htmlFor="search">Search by name</JobLabel>
      <JobInput
        type="text"
        value={searchString}
        onChange={onChangeSearchString}
        id="search"
      />
      <List
        data={jobs}
        header={listHeader}
        excludeFields={excludeFields}
        onChangeSort={onChangeSort}
      />
    </JobContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs.jobs,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchJobs: ({ search, sortBy }) => {
    const { processId } = props.match.params;
    dispatch(requestJobs({ params: { search, ...sortBy }, processId }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageJobs);
