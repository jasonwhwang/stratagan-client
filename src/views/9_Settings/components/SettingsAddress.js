import React from 'react'
import { putUser } from '../../../services/api'
import Loading from '../../0_Components/4_Loading/Loading'
import '../Settings.css'
import Script from 'react-load-script'

class SettingsAddress extends React.Component {
  state = {
    city: '',
    address: "",
    error: "",
    success: "",
    loading: false
  }


  componentDidMount() {
    this.setState({ ...this.state, address: this.props.user.address })
  }

  changeLoading = (val) => {
    this.setState({ ...this.state, loading: val })
  }

  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
    };
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      options,
    );
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['address_components', 'formatted_address']);
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          ...this.state,
          city: address[0].long_name,
          address: addressObject.formatted_address,
        }
      );
    }
  }

  onSubmitForm = async (e) => {
    e.preventDefault()
    this.changeLoading(true)
    let res = await putUser({ user: this.state })
    if (res.error) {
      this.setState({ ...this.state, error: res.error, loading: false, success: "" })
    } else {
      this.props.changeUser(res.user)
      this.setState({ ...this.state, success: "Successfully updated address.", loading: false, error: "" })
    }
  }

  render() {
    return (
      <div className="box-margin-bottom-40">
        <form className="page-padding" onSubmit={this.onSubmitForm}>
          <h4 className="box-text-bold box-margin-bottom-20">Location</h4>

          <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_g_API_KEY}&libraries=places`}
            onLoad={this.handleScriptLoad}
          />
          <input
            id="address"
            type="text"
            maxLength="150"
            className="box-input box-spacer box-margin-bottom-20"
            onChange={this.onChangeInput}
            value={this.state.address}
            placeholder="Address" />

          <div className="box-flex-row">
            <div><button
              className="box-button-line-gray box-text-bold box-background box-text-nowrap">
              Update Address
            </button></div>

            {
              this.state.error !== "" && !this.state.loading &&
              <h6 className="box-text-8 box-color-red box-text-nobold box-margin-left-20 settings-warningHeight box-flex-row box-flex-acenter">
                {this.state.error}
              </h6>
            }
            {
              this.state.success !== "" && !this.state.loading &&
              <h6 className="box-text-8 box-text-nobold box-margin-left-20 settings-warningHeight box-flex-row box-flex-acenter">
                {this.state.success}
              </h6>
            }
            {
              this.state.loading && <div className="box-margin-left-20"><Loading small={true} /></div>
            }
          </div>
        </form>
      </div>
    )
  }
}

export default SettingsAddress