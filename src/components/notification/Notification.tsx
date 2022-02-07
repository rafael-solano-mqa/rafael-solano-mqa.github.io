import React, { useRef } from "react";
import { MessageBox, Toast } from "@ui5/webcomponents-react";

interface nProperties {
	show: boolean;
	message: string;
	title?: string;
	type?: any;
	onClose: any;
	actions: any[];
}

export function Notification(props: nProperties) {
	return (
		<MessageBox
			open={props.show}
			titleText={props.title}
			onClose={props.onClose}
			type={props.type}
			actions={props.actions}
		>
			{props.message}
		</MessageBox>
	);
}

interface toastProperties {
	show: boolean;
	message?: string;
	onClose: any;
	duration?: number;
}

interface mProperties {
	toastShow: toastProperties;
}

export function ToastMessage(props: mProperties) {
	const closeToast = { show: false, message: "", onClose: function () {} };
	const toast = useRef<any>(null);
	const duration = props.toastShow.duration ? props.toastShow.duration : 5000;

	const run = async () => {
		await props;
		toast?.current?.show();
		setTimeout(() => {
			props.toastShow.onClose(closeToast);
		}, duration);
	};

	run();

	return (
		<Toast duration={duration} ref={toast}>
			{props.toastShow.message}
		</Toast>
	);
}
