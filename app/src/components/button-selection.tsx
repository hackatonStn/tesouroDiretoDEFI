"use client";
import React from "react";

export interface IButtonSelectItem {
	className?: string;
	onClick: () => void;
	label: string;
	value: string;
}

interface ButtonSelectionProps {
	items: IButtonSelectItem[];
	value: string;
	className?: string;
	style: 'tabs-boxed' | `tabs-bordered`
	active: 'bg-primary'| 'bg-secondary' | 'bg-success' | 'bg-danger' | 'bg-warning' | 'bg-info' | 'bg-dark' | 'bg-light' | 'bg-white' | 'bg-transparent'
	label: 'text-black'| 'text-white'
}

interface ButtonSelectionState {}

class ButtonSelection extends React.Component<ButtonSelectionProps, ButtonSelectionState> {
	render() {
		let css = '';
		if (this.props.style == 'tabs-boxed') 
			css = `${this.props.active} ${this.props.label} animate__animated animate__bounceIn`;
		if (this.props.style == 'tabs-bordered') 
			css = `bg-transparent border-b-2 border-primary ${this.props.label} animate__animated animate__bounceIn`;
		return (
			<>
				<div role="tablist" className={`tabs ${this.props.style}`}>
					{this.props.items.map((item, index) => {
						return (
							<a
								role="tab"
								key={index}
								className={`tab ${item.value == this.props.value && `${css}`}`}
								onClick={() => item.onClick()}
							>
								{item.label}
							</a>
						);
					})}
				</div>
			</>
		);
	}
}

export default ButtonSelection;
// return (
// 	<a
// 		role="tab"
// 		key={index}
// 		className={`tab ${item.value == this.props.value && `${this.props.active} ${this.props.label} animate__animated animate__bounceIn`}`}
// 		onClick={() => item.onClick()}
// 	>
// 		{item.label}
// 	</a>
// );
// })}