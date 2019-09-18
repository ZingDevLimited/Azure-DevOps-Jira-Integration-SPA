import React from 'react';
import {Issue} from '../models/jira/User';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Chip } from '@material-ui/core';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
export interface IssueProps {
    issue: Issue;
    epics: Issue[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      'margin-left': '.5em',
    }
  }),
);

const  IssueComponent: React.FC<IssueProps> = (props: IssueProps) =>{
    const classes = useStyles();
    props.epics.map(e =>{
      if(e.key === props.issue.fields.customfield_10014){
          props.issue.fields.customfield_10001 = e.fields.customfield_10011;
      }
    })

    function handleDelete(e:any) {
        const tag = e.target.parentElement;
        if(tag.tagName == "DIV") {
          tag.remove();
        }
        else if(tag.tagName == "svg"){
          tag.parentElement.remove();
        }
    }
    return(
      <div>
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={ props.issue.fields.assignee === null ? '' : props.issue.fields.assignee.avatarUrls["16x16"] } />
          </ListItemAvatar>
          <img src={props.issue.fields.issuetype.iconUrl} />
          <ListItemText className={classes.root} primary={props.issue.key + " " + props.issue.fields.summary} />
          <Chip className={classes.root} label={props.issue.fields.customfield_10001} onDelete={handleDelete}/>
          <Checkbox color="primary"/>
        </ListItem>
        <Divider />
      </div>
    )
}

export default IssueComponent