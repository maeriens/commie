# Commie
### Your Commit Comrade!
Commie is a tool to check your commit messages following some preestablished rules by you

## Usage
In the root folder of the project, create a `.commierc`, `.commierc.yaml`, `.commierc.yml`, 
`.commierc.json`, or a `.commierc.js` exporting an object file with the desired options;
 or add a `commie` property to the `package.json`. 

To check the commit message, add `commie` to the `scripts` section.

Adding no severity to a rule sets it to WARNING.
Matchers are required for all rules save for **Capitalized** which ignores it.

## Rules

 - **Start**
 - **End**
 - **Contains**
 - **Capitalized**

## Example

`.commierc`

```JSON
{
  "start": {
    "severity": "error",
    "matchers": ["feature", "fix", "hotfix", "bugfix"]
  },
  "contains": {
    "severity": "warn",
    "matchers": "JIRA-"
  },
  "capitalized": { 
    "severity": "warn"
  }
}
```

## Husky Integration

```json
"husky": {
    "hooks": {
      "commit-msg": "npm run commie"
    }
  }
```

## Links

 - [Options parsing via Cosmiconfig](https://github.com/davidtheclark/cosmiconfig)
 - [Colored output using Colors](https://github.com/Marak/colors.js)