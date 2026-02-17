import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { Fragment, useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type Props = {
	onApply: (newState: Partial<ArticleStateType>) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({ onApply, onReset }: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedFont, setSelectedFont]: [
		ArticleStateType,
		React.Dispatch<React.SetStateAction<ArticleStateType>>
	] = useState(defaultArticleState);
	const handleChange = (key: keyof ArticleStateType, option: OptionType) => {
		setSelectedFont((prev) => ({
			...prev,
			[key]: option,
		}));
	};

	return (
		<Fragment>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevState) => !prevState)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setIsOpen((prevState) => !prevState);
						onApply(selectedFont);
					}}>
					<h2 className={styles.title}>Задайте параметры</h2>
					<fieldset className={styles.group}>
						<Select
							options={fontFamilyOptions}
							placeholder={selectedFont.fontFamilyOption.title}
							selected={selectedFont.fontFamilyOption}
							onChange={(option) => handleChange('fontFamilyOption', option)}
							onClose={() => setSelectedFont(selectedFont)}
							title='шрифт'
						/>
						<RadioGroup
							name='font-size'
							options={fontSizeOptions}
							selected={selectedFont.fontSizeOption}
							onChange={(option) => handleChange('fontSizeOption', option)}
							title='размер шрифта'
						/>
						<Select
							options={fontColors}
							placeholder={selectedFont.fontColor.title}
							selected={selectedFont.fontColor}
							onChange={(option) => handleChange('fontColor', option)}
							onClose={() => setSelectedFont(selectedFont)}
							title='цвет шрифта'
						/>
					</fieldset>
					<Separator />
					<fieldset className={styles.group}>
						<Select
							options={backgroundColors}
							placeholder={selectedFont.backgroundColor.title}
							selected={selectedFont.backgroundColor}
							onChange={(option) => handleChange('backgroundColor', option)}
							onClose={() => setSelectedFont(selectedFont)}
							title='цвет фона'
						/>
						<Select
							options={contentWidthArr}
							placeholder={selectedFont.contentWidth.title}
							selected={selectedFont.contentWidth}
							onChange={(option) => handleChange('contentWidth', option)}
							onClose={() => setSelectedFont(selectedFont)}
							title='ширина контента'
						/>
					</fieldset>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setSelectedFont(defaultArticleState);
								onReset();
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</Fragment>
	);
};
