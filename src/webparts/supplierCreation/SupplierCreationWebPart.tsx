import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import SupplierCreation from "./components/SupplierCreation";
import * as strings from "SupplierCreationWebPartStrings";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./components/store/store"; // Import the Redux store
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

export interface ISupplierCreationWebPartProps {
  description: string;
}

export default class SupplierCreationWebPart extends BaseClientSideWebPart<ISupplierCreationWebPartProps> {
  public render(): void {
    // Correct JSX handling with React
    const element: React.ReactElement = (
      <Provider store={store}>
        <SupplierCreation />
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Provider>
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
