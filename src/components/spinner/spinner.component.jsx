import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "./spinner.styles";

//creating a loading spinner,
//wrapping a component
//conditionaklly rendered based on the isLoading property
const Spinner = (WrappedComponent) => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default Spinner;
