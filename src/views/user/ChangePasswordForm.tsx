import { Form, FormGroup, FormItem } from '@ui5/webcomponents-react';
import React, { useContext, useState } from 'react';
import { useParams } from "react-router-dom";
import { DataForm, DataTextBox } from '../../components/form';
import { LabelEnum } from '../../context/LabelEnum';
import { LocaleContext, LocaleContextDef } from '../../context/LocaleContext';
import { ACLService } from '../../services/ACLService';
import { ChangePasswordFormParams } from "./types";

const customerColumnLayout = {
	small: 1,
	medium: 1,
	large: 1,
	extraLarge: 1,
};

const changePasswordFormLayout = (
	localeContext: LocaleContextDef	
): React.ReactElement => {
	
	return (
		<Form
			className="user-form"
			columnsS={customerColumnLayout.small}
			columnsM={customerColumnLayout.medium}
			columnsL={customerColumnLayout.large}
			columnsXL={customerColumnLayout.extraLarge}
		>
			<FormGroup titleText={localeContext.staticLabel(LabelEnum.AUTHENTICATION)}>
				<FormItem label={localeContext.staticLabel(LabelEnum.PASSWORD)}>
					<DataTextBox name="password1" type="Password" required={false} maxlength={64} />
				</FormItem>

				<FormItem label={localeContext.staticLabel(LabelEnum.PASSWORD)}>
					<DataTextBox name="password2" type="Password" required={false} maxlength={64} />
				</FormItem>
			</FormGroup>

		</Form>
	);  
};

export function ChangePasswordForm() {
	const localeContext = useContext(LocaleContext);
	const { name } = useParams<ChangePasswordFormParams>();
	const [title] = useState<string>(`${localeContext.staticLabel(LabelEnum.UPDATE)} ${localeContext.staticLabel(LabelEnum.PASSWORD)}`);

	return (
		<DataForm
			formId={name}
			listFormUrl={"/users/"}
			createCallback={ACLService.changePassword}
			updateCallback={ACLService.changePassword}
			findCallback={ACLService.find}
			parametersFactory={() => name}
			layoutFactory={() => changePasswordFormLayout(localeContext)}
			title={title}
		/>
	);
}