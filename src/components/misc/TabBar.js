import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import * as templates from '../../utilities/templates'

var TabBar = React.createClass({
  // Check PropTypes. Requires [{title: string, onPress: func}]
  propTypes: {
    tabs: PropTypes.arrayOf(React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      onPress: React.PropTypes.func.isRequired,
    })),
  },

  render() {
    return (
      <View style={styles.container}>
        {this.props.tabs.map(e => {
          return this.createTab(e);
        })}
      </View>
    );
  },

  // Creates a single tab
  createTab(tab) {
    return (
      <TouchableHighlight
        key={tab.title}
        style={this.tabStyle(tab)}
        onPress={tab.onPress}
        underlayColor={templates.colors.middleGray}>
        <Text style={this.textStyle(tab)}>{tab.title}</Text>
      </TouchableHighlight>
    );
  },

  // Checks if the provided tab is the selected tab
  isSelected(tab) {
    return this.props.chosenSearchTab === tab.title;
  },

  // Returns style based on if selected/not selected
  style(tab) {
    if (this.isSelected(tab)) { return this.props.theme.tabChosen; }
    else { return this.props.theme.tabNotChosen; }
  },

  // Tab container style
  tabStyle(tab) {
    const style = this.style(tab);
    return {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: style.backgroundColor,
      borderWidth: 0.5,
      borderTopWidth: style.borderTopWidth,
      borderColor: this.props.theme.mainContainer.backgroundColor,
    }
  },

  // Tab text style
  textStyle(tab) {
    const style = this.style(tab);
    return {
      color: style.textColor,
      fontWeight: style.fontWeight,
      fontSize: this.props.theme.subtitle.fontSize,
    }
  }
})

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    height: 50,
    flexDirection: 'row',
  }
})

function mapStateToProps(state) {
  return {
    theme: state.settingsReducer.themeStyle,
    chosenSearchTab: state.uiReducer.chosenSearchTab,
  };
}

export default connect(mapStateToProps, null) (TabBar);
