/* eslint-disable react/prop-types */
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import useSort from "../../../hooks/useSort";
import {
  requestProcesses,
  createRequestProcess,
  deleteRequestProcess,
} from "../../../actions/process/processActions";
import List from "../../ui/List/List";
import urlPageJobs from "../../../urls/urlPageJobs";
import useInterval from "../../../hooks/useInterval";

const ProcessContainer = styled.div``;

const Button = styled.button``;

const listHeader = ["name", "startTime", "jobsCount", "status"];

const excludeFields = ["_id", "jobs"];

const PageProcesses = ({
  processes,
  fetchProcesses,
  createProcess,
  handleRedirect,
  deleteProcess,
  postStatus,
  deleteStatus,
  pending,
}) => {
  const [sortBy, onChangeSort] = useSort({});

  const getProcesses = useCallback(() => {
    fetchProcesses({ sortBy });
  }, [sortBy, fetchProcesses]);

  useEffect(() => {
    getProcesses();
  }, [getProcesses, sortBy]);

  useEffect(() => {
    if (postStatus === "ok" || deleteStatus === "ok") {
      getProcesses();
    }
  }, [deleteStatus, postStatus, getProcesses, sortBy]);
  useInterval(getProcesses, 10000);
  return (
    <ProcessContainer>
      <Button onClick={createProcess} disabled={pending}>
        Create Process
      </Button>
      <List
        data={processes}
        header={listHeader}
        excludeFields={excludeFields}
        onRedirect={handleRedirect}
        showRemove
        deleteItem={deleteProcess}
        onChangeSort={onChangeSort}
      />
    </ProcessContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    processes: state.processes.data,
    postStatus: state.processes.postStatus,
    deleteStatus: state.processes.deleteStatus,
    pending:
      state.processes.deleteStatus === "pending" ||
      state.processes.postStatus === "pending",
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  fetchProcesses: ({ sortBy }) => {
    dispatch(requestProcesses({ params: { ...sortBy } }));
  },
  createProcess: () => {
    dispatch(createRequestProcess());
  },
  handleRedirect: (processId) => {
    return props.history.push(`${urlPageJobs({ processId })}`);
  },
  deleteProcess: (processId) => {
    dispatch(deleteRequestProcess({ processId }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageProcesses);
