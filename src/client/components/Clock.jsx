import React from "react";
import ClockDisplays from "./ClockDisplays.jsx";
import { BsPlus } from "react-icons/bs";

export default class Clock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Time Zone adjusted.
      zones: [],
    };

    this._handleZoneChange = this._handleZoneChange.bind(this);
    this._handleAddClock = this._handleAddClock.bind(this);
    this._createTitle = this._createTitle.bind(this);
  }

  componentDidMount() {
    this.setState({
      zones: JSON.parse(window.localStorage.getItem("zones")) || [
        "America/Los_Angeles",
      ],
    });
  }

  _handleAddClock() {
    if (this.state.zones.length === 5) {
      window.alert("You've reached the maximum number of clocks!");
      return;
    }

    const newZones = this.state.zones;

    try {
      window.localStorage.setItem("zones", JSON.stringify(newZones));
    } catch (e) {
      console.error(
        "We're sorry, but we were unable to store your preferences!"
      );
    }

    newZones.push(this.state.zones[this.state.zones.length - 1]);
    this.setState({
      zones: newZones,
    });
  }

  _handleZoneChange(event) {
    if (event.key === "Enter" && event.target.value !== undefined) {
      try {
        const targetValue = event.target.value.split(" ");
        const query =
          targetValue.length > 1
            ? `${targetValue[0]}_${targetValue[1]}`
            : targetValue[0];

        // Test if Time Zone is available.
        new Date().toLocaleString("en-us", {
          timeZone: query,
        });

        let newZones = this.state.zones;

        newZones[event.target.id] = query;
        window.localStorage.setItem("zones", JSON.stringify(newZones));
        this.setState({
          zones: newZones,
        });
      } catch (e) {
        window.alert(
          "Uh-oh, you've entered in a timezone that isn't supported."
        );
      }
    }
  }

  _createTitle(zone) {
    let temp = zone.split("_");

    return temp.length > 1 ? `${temp[0]} ${temp[1]}` : `${temp[0]}`;
  }

  render() {
    return (
      <div>
        <div className={"root"}>
          <div className={"pageTitle"}>Just Clocks</div>
          <div className={"about"}>About</div>
          <div className={"clockDisplay"}>
            {this.state.zones.map((zone, index) => (
              <div key={index} className={"clockContainer"}>
                <input
                  id={index}
                  className={"clockTitle"}
                  defaultValue={this._createTitle(zone)}
                  onKeyPress={this._handleZoneChange}
                ></input>
                <br />
                <ClockDisplays zone={zone} />
              </div>
            ))}
          </div>
        </div>
        <div className={"container"} onClick={this._handleAddClock}>
          <div className={"icon1 icon"}>
            <BsPlus className={"add"} />
          </div>
        </div>
      </div>
    );
  }
}
