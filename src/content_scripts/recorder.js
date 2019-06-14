function ScreenRecorder () {
    this.recording = false;
    this.events = [];

}

ScreenRecorder.prototype.toogleRecording = function () {
    if (!this.recording) {
        modal.show();
    }
    else {
        this.recording = false;
    }
}

ScreenRecorder.prototype.startRecording = function () {
    this.events = [];
    this.recording = true;
}

ScreenRecorder.prototype.setUp = function () {
    const me = this;
    rrweb.record({
        emit(event) {
            if (me.recording) {
                me.events.push(event);
            }
        },
    });

// this function will send events to the backend and reset the events array
    function save() {
        if (me.events.length > 0) {
            console.log('events pushed:', me.events);
            browser.runtime.sendMessage({"message": "save", "events": me.events, "screencastName": me.screencastName});
            me.events = [];
        }
    }
    setInterval(save, 5 * 1000);
}

var screenRecorder = new ScreenRecorder();
var modal = new RecorderModal(screenRecorder);
screenRecorder.setUp();

browser.runtime.onMessage.addListener((request, sender) => {
    screenRecorder.toogleRecording();
});

