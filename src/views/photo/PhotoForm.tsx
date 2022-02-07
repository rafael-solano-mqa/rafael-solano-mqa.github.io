import React, { useContext, useState } from 'react';
import { LabelEnum } from '../../context/LabelEnum';
import { LocaleContext, LocaleContextDef } from '../../context/LocaleContext';
import { PhotoFormParams } from './types';
import { useParams } from "react-router-dom";
import { DataForm, DataPicture, DataTextBox } from '../../components/form';
import { PhotoService } from '../../services/PhotoService';
import { ControlStateProvider } from '../../components/formActions';
import { NamedTuple } from '../../model';
import './PhotoListing.css';
import { Form, FormItem } from '@ui5/webcomponents-react';

const customerColumnLayout = {
	small: 1,
	medium: 1,
	large: 1,
	extraLarge: 1,
};

const userFormLayout = (
	localeContext: LocaleContextDef
): React.ReactElement => {
	return (		
		<Form
			className="photo-form"
			columnsS={customerColumnLayout.small}
			columnsM={customerColumnLayout.medium}
			columnsL={customerColumnLayout.large}
			columnsXL={customerColumnLayout.extraLarge}
		>
            <FormItem label={localeContext.staticLabel(LabelEnum.NAME)}>
                <DataTextBox name="name" maxlength={64} required={true}/>
            </FormItem>
            <FormItem label={localeContext.staticLabel(LabelEnum.PICTURE)}>
                <DataPicture name="rawBytes"  required={true}/>
            </FormItem>
			
		</Form>
	);  
};

const photoFormControlStateProviders:NamedTuple<string, ControlStateProvider> = {}

export const PhotoForm: React.FC = () => {
	const localeContext = useContext(LocaleContext);
	const { id } = useParams<PhotoFormParams>();
	const [title] = useState<string>(`${localeContext.staticLabel(LabelEnum.CREATE_UPDATE)} ${localeContext.staticLabel(LabelEnum.PICTURE)}`);

	return (
        <DataForm
            formId={id}
            listFormUrl={"/photos/"}
            createCallback={PhotoService.create}
            updateCallback={PhotoService.update}
            findCallback={PhotoService.find}
            parametersFactory={() => id}
            layoutFactory={() => userFormLayout(localeContext)}
            title={title}
            controlStateProviders={photoFormControlStateProviders}
			
        />
	);

}

