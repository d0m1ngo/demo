/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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

const listHeader = ["Name", "StartTime", "JobsCount", "Status"];

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
  useEffect(() => {
    fetchProcesses();
  }, [fetchProcesses]);
  useEffect(() => {
    if (postStatus === "ok" || deleteStatus === "ok") {
      fetchProcesses();
    }
  }, [deleteStatus, postStatus, fetchProcesses]);
  useInterval(fetchProcesses, 10000);
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
  fetchProcesses: () => {
    dispatch(requestProcesses());
  },
  createProcess: () => {
    dispatch(createRequestProcess());
  },
  handleRedirect: (id) => {
    return props.history.push(`${urlPageJobs()}?processId=${id}`);
  },
  deleteProcess: (processId) => {
    dispatch(deleteRequestProcess({ processId }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageProcesses);
