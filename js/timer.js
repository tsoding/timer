function urlParam(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

class Time {
    constructor(timeString) {
        this._seconds =
            timeString
            .split(':')
            .map(Number)
            .reduce((acc, x) => acc * 60 + x, 0);
    }

    render() {
        const seconds = this._seconds % 60;
        const minutes = Math.floor(this._seconds / 60) % 60;
        const hours = Math.floor(this._seconds / 60 / 60);

        return hours + ':' + minutes + ':' + seconds;
    }

    decrement() {
        this._seconds -= 1;

        if (this._seconds < 0) {
            this._seconds = 0;
        }
    }

    isFinished() {
        return this._seconds <= 0;
    }
}

class TimerLine {
    constructor(text) {
        this._text = text;
    }

    initialTime() {
        return new Time(this._text.match(/\{([0-9:]*)\}/)[1]);
    }

    renderWithTime(time) {
        return this._text.replace(/\{[0-9:]*\}/, time.render());
    }
}

class TsodingTimer {
    constructor(timerBoxId, timerLine) {
        this._timerBoxId = timerBoxId;
        this._timerLine = timerLine;
    }

    start() {
        this._currentTime = this._timerLine.initialTime();

        if (this._interval) {
            clearInterval(this._interval);
        }

        this._interval = setInterval(this._tick.bind(this), 1000);
        this._render();
    }

    _tick() {
        this._currentTime.decrement();

        if (this._currentTime.isFinished()) {
            clearInterval(this._interval);
        }

        this._render();
    }

    _render() {
        $(this._timerBoxId).text(this._timerLine.renderWithTime(this._currentTime));
    }
}

$(() => {
    new TsodingTimer("#timer-box",
                     new TimerLine(decodeURIComponent(urlParam('timer-line'))))
        .start();
});
