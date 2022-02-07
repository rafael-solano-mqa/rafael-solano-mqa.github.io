import React from "react";
import { Switch, Route } from "react-router-dom";
import { PhotoForm, PhotoListing } from "../../views/photo";
import { ChangePasswordForm } from "../../views/user";
import WelcomeForm from "../../views/welcome/WelcomeForm";
import { NavigatorSwitchProperties } from "./types";

export function NavigatorSwitch(properties: NavigatorSwitchProperties) {
	const session = properties.session;
	if (!session.user) {
		return <></>;
	}

	return (
		<Switch>
			<Route exact={true} path={["/welcome/", "/"]}>
				<WelcomeForm />
			</Route>

			<Route exact={true} path={`/change-password/:name`}>
				<ChangePasswordForm />
			</Route>

			<Route exact={true} path="/photos/">
				<PhotoListing />
			</Route>

			<Route exact={true} path={["/photo/", "/photo/:id"]}>
				<PhotoForm />
			</Route>


		</Switch>
	);
}
