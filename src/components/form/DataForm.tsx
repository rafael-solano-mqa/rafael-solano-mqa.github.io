import { MessageBox } from "@ui5/webcomponents-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { DataFormProperties } from ".";
import { LabelEnum } from "../../context/LabelEnum";
import { LocaleContext } from "../../context/LocaleContext";
import ServiceError from "../../services/ServiceError";
import { DeclineEvent, FormActions, FormSaveEvent, FormState, FormSubmissionError, onValidateHandler } from "../formActions";
import './DataForm.css';

// eslint-disable-next-line no-unused-vars
const defaultValidator: onValidateHandler = (element: any) => true;

export function DataForm(props: DataFormProperties) {
  const controlStateProviders = props.controlStateProviders || {};
  const localeContext = useContext(LocaleContext);
  const formId = props.formId;
  const listFormUrl = props.listFormUrl;
  const parametersFactory = props.parametersFactory;
  const createCallback = props.createCallback;
  const updateCallback = props.updateCallback;
  const findCallback = props.findCallback;
  const validator = props.validator || defaultValidator;
  const layoutFactory = props.layoutFactory;
  const [formState, setFormState] = useState<FormState>({ isEditing: false, key: null, showErrorMessage: false });
  const formActionsRef: any = useRef(null);
  const history = useHistory();
  const entityKey = (formData: any) => ({ id: formData.id });
  const title = props.title || "Untitled";
  const onSuccess: () => void = () => history.push(listFormUrl)
  const onErrorMessageClose = () => setFormState({ ...formState, showErrorMessage: false, submissionError: undefined });

  const executeSave = async (event: FormSaveEvent, onSuccess?: () => void) => {
    const data = event.data;
    const result = formState.isEditing ? await updateCallback(Object.assign(data, formState.key)) : await createCallback(data);

    if (result instanceof ServiceError) {
      const submissionError: FormSubmissionError = result.response.data;      
      formActionsRef.current.setResponseMessages(submissionError.validationMessages, event.data);
      setFormState({...formState, showErrorMessage:true, submissionError: submissionError});

    } else {
      setFormState({...formState, showErrorMessage:false, submissionError: undefined});
      formActionsRef.current.setFormData(result.entity);

      if(onSuccess) {
        onSuccess();        
      }
    }

  }

  const onSaveAndClose = (event: FormSaveEvent) => (async () => await executeSave(event, onSuccess))();

  const onSave = (event: FormSaveEvent) => (async () => await executeSave(event))();

  // eslint-disable-next-line no-unused-vars
  const onDecline = (event: DeclineEvent) => {
    history.push(listFormUrl);
  };

  useEffect(() => {
    if (formId) {
      (async () => {
        const result = (await findCallback(parametersFactory())) || {};
        formActionsRef.current.setFormData(result);
        setFormState({ ...formState, isEditing: true, key: entityKey(result) });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <FormActions
        ref={formActionsRef}
        onDecline={onDecline}
        onSaveAndClose={onSaveAndClose}
        onSave={onSave}
        onValidate={validator}
        title={title}
        controlStateProviders={controlStateProviders}
      />
      {layoutFactory()}
      <MessageBox className="error-message" type="Error" open={formState.showErrorMessage} onClose={onErrorMessageClose}>
        {formState.submissionError ? (
          formState.submissionError.exception ? 
            formState.submissionError.exception : 
            localeContext.staticLabel(LabelEnum.VALIDATION_NOTICE
          )
        ): <></>}
      </MessageBox>
    </div>
  )
}