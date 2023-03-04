import { Text as NativeText, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
	children: React.ReactNode;
	style?: TextStyle;
	variant?: 'bold' | 'regular';
}

export const Text = ({ children, style, variant }: TextProps) => {
	return (
		<NativeText
			style={[
				styles.text,
				style,
				{
					fontFamily:
						variant === 'bold'
							? 'Sk-Modernist-Bold'
							: 'Sk-Modernist-Regular',
				},
			]}
		>
			{children}
		</NativeText>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
	},
});

export default Text;
