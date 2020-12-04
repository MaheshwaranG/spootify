const theme: {[key:string]: any } = {
    "name": "my theme",
    "rounding": 4,
    "spacing": 24,
    "defaultMode": "light",
    "global": {
      "colors": {
        "brand": {
          "dark": "#304ffe",
          "light": "#304ffe"
        },
        "background": {
          "dark": "#111111",
          "light": "#FFFFFF"
        },
        "background-back": {
          "dark": "#111111",
          "light": "#EEEEEE"
        },
        "background-front": {
          "dark": "#222222",
          "light": "#FFFFFF"
        },
        "background-contrast": {
          "dark": "#FFFFFF11",
          "light": "#11111111"
        },
        "text": {
          "dark": "#EEEEEE",
          "light": "#333333"
        },
        "text-strong": {
          "dark": "#FFFFFF",
          "light": "#000000"
        },
        "text-weak": {
          "dark": "#CCCCCC",
          "light": "#444444"
        },
        "text-xweak": {
          "dark": "#999999",
          "light": "#666666"
        },
        "border": {
          "dark": "#444444",
          "light": "#c5cae9"
        },
        "control": {
          "light": "brand",
          "dark": "brand"
        },
        "active-background": "background-contrast",
        "active-text": "text-strong",
        "selected-background": {
          "light": "brand",
          "dark": "brand"
        },
        "selected-text": {
          "light": "text-strong",
          "dark": "text-strong"
        },
        "status-critical": {
          "light": "#FF4040",
          "dark": "#FF4040"
        },
        "status-warning": {
          "light": "#FFAA15",
          "dark": "#FFAA15"
        },
        "status-ok": {
          "light": "#00C781",
          "dark": "#00C781"
        },
        "status-unknown": {
          "light": "#CCCCCC",
          "dark": "#CCCCCC"
        },
        "status-disabled": {
          "light": "#CCCCCC",
          "dark": "#CCCCCC"
        },
        "graph-0": "brand",
        "graph-1": "status-warning",
        "focus": {
          "light": "brand",
          "dark": "brand"
        }
      },
      "font": {
        "family": "Helvetica"
      },
      "active": {
        "background": "active-background",
        "color": "active-text"
      },
      "hover": {
        "background": "active-background",
        "color": "active-text"
      },
      "selected": {
        "background": "selected-background",
        "color": "selected-text"
      },
        "animation": {
          "duration": '10s',
        }
    },
    "chart": {},
    "diagram": {
      "line": {}
    },
    "meter": {}
  }

  export default theme;