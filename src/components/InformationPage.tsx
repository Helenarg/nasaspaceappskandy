import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageShell from './PageShell';
import Navbar from './Navbar';
import Footer from './Footer';
import PageHeader from './PageHeader';
import PageMeta from './PageMeta';
import { Text } from './LocalizedText';
import { layout } from '../theme/layout';
import { useViewport } from '../theme/useViewport';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import ActionLink from './ActionLink';

export default function InformationPage({title, description, path, sections}: {
  title: string; description: string; path: string; sections: readonly {title: string; body: string}[];
}) {
  const {width} = useViewport();
  return <PageShell><PageMeta title={`${title} | Space Apps Kandy`} description={description} path={path}/>
    <Navbar/><PageHeader number="INFO" eyebrow="PARTICIPANT INFORMATION" title={title} description={description}/>
    <View style={layout.contentSection(width)}>{sections.map(section => <View key={section.title} style={styles.section}>
      <Text accessibilityRole="header" aria-level={2} style={styles.title}>{section.title}</Text>
      <Text style={styles.body}>{section.body}</Text>
    </View>)}<ActionLink href="https://www.spaceappschallenge.org/2026/" label="OFFICIAL EVENT WEBSITE" secondary/></View><Footer/>
  </PageShell>;
}
const styles = StyleSheet.create({section:{marginBottom:32,maxWidth:800},title:{fontFamily:fonts.heading,fontSize:24,lineHeight:34,color:colors.text,marginBottom:12},body:{fontFamily:fonts.body,fontSize:16,lineHeight:27,color:colors.textMuted}});
