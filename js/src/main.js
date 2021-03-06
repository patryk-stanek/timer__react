function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
};

class Timer extends React.Component {

    constructor() {
        super()

        this.state = {
            timer: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }

        this.running = false;
        this.reset();

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.clear = this.clear.bind(this);
        this.save = this.save.bind(this);
        this.clearTimes = this.clearTimes.bind(this);
    }

    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        }
    }

    start() {
        if (!this.running) {
            this.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    stop() {
        this.running = false;
        clearInterval(this.watch);
    }

    clear() {
        this.reset();
        this.setState({
            timer: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    calculate() {
        this.times.miliseconds += 1;
        if (this.times.miliseconds >=  100) {
            this.times.seconds += 1;
            this.times.miliseconds = 0;
        }
        if (this.times.seconds >= 60) {
            this.times.minutes += 1;
            this.times.seconds = 0;
        }
        this.setState({
            timer: {
                minutes: this.times.minutes,
                seconds: this.times.seconds,
                miliseconds: this.times.miliseconds
            }
        })
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
    }

    step() {
        if (!this.running) return;
        this.calculate();
    }

    save() {
        const results = document.getElementById('results');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(`${this.format(this.times)}`));
        results.appendChild(li);
    }

    clearTimes() {
        let results = document.getElementById('results');
        results.innerHTML = "";
    }

    render() {
        return (
            <div>
                <nav className="controls">
                    <a href="#" className="button" id="start" onClick={this.start}><i className="fas fa-play"></i></a>
                    <a href="#" className="button" id="stop" onClick={this.stop}><i className="fas fa-stop"></i></a>
                    <a href="#" className="button" id="clear" onClick={this.clear}><i className="fas fa-redo-alt"></i></a>
                    <br/>
                    <a href="#" className="button" id="save" onClick={this.save}><i className="fas fa-save"></i></a>
                    <a href="#" className="button" id="refresh" onClick={this.clearTimes}><i className="fas fa-broom"></i></a>
                </nav>
                <div className="stopwatch">{this.format(this.state.timer)}</div>
                <ul id="results"></ul>
            </div>
        )
    }

}

const timer = React.createElement(Timer);
ReactDOM.render(timer, document.getElementById('timer'));