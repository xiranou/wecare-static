import React, { Component } from 'react';
import './App.css';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { withTheme, withStyles } from 'material-ui/styles'
import teal from 'material-ui/colors/teal';

const theme = createMuiTheme({
  palette: {
    primary: {
        light: teal[100],
        main: teal[200],
        dark: teal[300],
      },
  },
  status: {
    danger: 'orange',
  },
});

const styles = {
  root: {
    flexGrow: 1,
  },
  xtraPadding: {
    padding: '24px !important',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  paraPadding: {
    padding: '10px 20px',
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disableInput: false
    }

    this.saveEmail = this.saveEmail.bind(this);
  }

  validateEmail(email) {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      alert("You have entered an invalid email address!")
      return (false)
  }

  async saveEmail() {
    if (!this.validateEmail(this.email.value)) return null;
    const userData = {
      firstName: this.firstName.value || null,
      lastName: this.lastName.value || null,
      state: this.homestate.value || null,
      email: this.email.value || null,
    }
    await this.props.firebase.saveEmail(userData);
    this.setState({ disableInput: true });
  }

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <div className={`App ${classes.root}`}>
          <Grid container spacing={24}>
            <Grid className="left" item xs={12} sm={12} md={7}>
              <img className="hero-img" src="/comps.png" alt="one-box"/>
            </Grid>
            <Grid className={classes.xtraPadding} item xs={12} sm={12} md={5}>
                <Grid item xs={12}>
                  <Paper>
                    <h2 className={classes.paraPadding}>WeCare Alpha Sign-up</h2>
                  </Paper>
                  <Paper>
                    <p className={classes.paraPadding}>
                      Living your Life? Going to college? Getting married? Having a baby? WeCare is a
                      subscription box service that takes your lifestyle and key life events
                      to find products and programs that will help you excel in all your adventures.
                      Please sign-up below to join the Alpha test. We will select people to receive
                      boxes and give us feedback.
                    </p>
                  </Paper>
                  <Paper>
                  <Grid container spacing={0}>
                    <Grid xs={12}>
                      <TextField
                        id="firstname"
                        label="First Name"
                        placeholder="First Name"
                        className={classes.textField}
                        margin="normal"
                        inputProps={{ ref: (firstName) => { this.firstName = firstName; } }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        id="lastname"
                        label="Last Name"
                        placeholder="Last Name"
                        className={classes.textField}
                        margin="normal"
                        inputProps={{ ref: (lastName) => { this.lastName = lastName; } }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        id="state"
                        label="State"
                        placeholder="State"
                        className={classes.textField}
                        margin="normal"
                        inputProps={{ ref: (homestate) => { this.homestate = homestate; } }}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <TextField
                        className={classes.textField}
                        disabled={this.state.disableInput}
                        id="email"
                        label="Email"
                        margin="normal"
                        placeholder="Email"
                        inputProps={{ ref: (email) => { this.email = email; } }}
                      />
                    </Grid>
                    <Grid className={classes.paraPadding} xs={12}>
                      <Button
                        variant="raised"
                        color="primary"
                        disabled={this.state.disableInput}
                        onClick={this.saveEmail}
                      >
                        {this.state.disableInput ? 'Saved' : 'Submit'}
                      </Button>
                    </Grid>
                  </Grid>
                  </Paper>
                </Grid>
            </Grid>
          </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withTheme()(withStyles(styles)(App));
