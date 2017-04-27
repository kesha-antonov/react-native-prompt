import React, { Component } from 'react';
import {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes
} from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    cancelText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    submitText: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    borderColor: PropTypes.string,
    promptStyle: PropTypes.oneOfType([
      PropTypes.object,
      ViewPropTypes.style,
      PropTypes.array
    ]),
    titleStyle: PropTypes.oneOfType([
      PropTypes.object,
      Text.propTypes.style,
      PropTypes.array
    ]),
    buttonStyle: PropTypes.oneOfType([
      PropTypes.object,
      ViewPropTypes.style,
      PropTypes.array
    ]),
    buttonTextStyle: PropTypes.oneOfType([
      PropTypes.object,
      Text.propTypes.style,
      PropTypes.array
    ]),
    submitButtonStyle: PropTypes.oneOfType([
      PropTypes.object,
      ViewPropTypes.style,
      PropTypes.array
    ]),
    submitButtonTextStyle: PropTypes.oneOfType([
      PropTypes.object,
      Text.propTypes.style,
      PropTypes.array
    ]),
    cancelButtonStyle: PropTypes.oneOfType([
      PropTypes.object,
      ViewPropTypes.style,
      PropTypes.array
    ]),
    cancelButtonTextStyle: PropTypes.oneOfType([
      PropTypes.object,
      Text.propTypes.style,
      PropTypes.array
    ]),
    inputStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    textInputProps: PropTypes.object,
  };

  static defaultProps = {
    visible: false,
    defaultValue: '',
    cancelText: 'Cancel',
    submitText: 'OK',
    borderColor:'#ccc',
    promptStyle: {},
    titleStyle: {},
    buttonStyle: {},
    buttonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    inputStyle: {},
    onChangeText: () => {},
  };

  state = {
    value: '',
    visible: false,
  };

  componentDidMount() {
    this.setState({value: this.props.defaultValue});
  }

  componentWillReceiveProps(nextProps) {
    const { visible, defaultValue } = nextProps;
    this.setState({ visible, value:defaultValue });
  }

  _onChangeText = (value) => {
    this.setState({ value });
    this.props.onChangeText(value);
  };

  _onSubmitPress = () => {
    const { value } = this.state;
    this.props.onSubmit(value);
  };

  _onCancelPress = () => {
    this.props.onCancel();
  };

  close = () => {
    this.setState({visible: false});
  };

  _renderDialog = () => {
    const {
      title,
      placeholder,
      defaultValue,
      cancelText,
      submitText,
      borderColor,
      promptStyle,
      titleStyle,
      buttonStyle,
      buttonTextStyle,
      submitButtonStyle,
      submitButtonTextStyle,
      cancelButtonStyle,
      cancelButtonTextStyle,
      inputStyle
    } = this.props;
    return (
      <View style={styles.dialog} key="prompt">
        <View style={styles.dialogOverlay}/>
        <View style={[styles.dialogContent, { borderColor }, promptStyle]}>
          <View style={[styles.dialogTitle, { borderColor }]}>
            <Text style={[styles.dialogTitleText, titleStyle]}>
              { title }
            </Text>
          </View>
          <View style={styles.dialogBody}>
            <TextInput
              style={[styles.dialogInput, inputStyle]}
              defaultValue={defaultValue}
              onChangeText={this._onChangeText}
              placeholder={placeholder}
              autoFocus={true}
              underlineColorAndroid="white"
              {...this.props.textInputProps} />
          </View>
          <View style={[styles.dialogFooter, { borderColor }]}>
            <TouchableWithoutFeedback onPress={this._onCancelPress}>
              <View style={[styles.dialogAction, buttonStyle, cancelButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, cancelButtonTextStyle]}>
                  {cancelText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._onSubmitPress}>
              <View style={[styles.dialogAction, buttonStyle, submitButtonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle, submitButtonTextStyle]}>
                  {submitText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <Modal onRequestClose={() => this.close()} transparent={true} visible={this.props.visible}>
        {this._renderDialog()}
      </Modal>
    );
  }
};
