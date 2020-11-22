# cfa-portal

#### VUE.js project for a Chick-fil-A Web Portal.

## Notes:
Guest Complaints from the backend should be provided in a JSON using the following template:
```
{
    id: id number,
    name: Guest's Name as String,
    date: timestamp,
    teamMember: Team Member's initials as String,
    transNum: Transaction Number as int, 
    description: Issue description as String,
    items: [
        Array of Strings as Such (using pre-defined buttons):
        "Chick-fil-A Sandwich",
        "Fries"
    ],
},
```

## CFA Branded Colors:
### Primary Colors
![#dd0033](https://placehold.it/150x40/dd0033/FFFFFF?text=dd0033)
![#5b6770](https://placehold.it/150x40/5b6770/FFFFFF?text=5b6770)
![#af272f](https://placehold.it/150x40/af272f/FFFFFF?text=af272f)

### Dark Colors
![#004f71](https://placehold.it/150x40/004f71/FFFFFF?text=004f71)
![#ffb549](https://placehold.it/150x40/ffb549/FFFFFF?text=ffb549)
![#00635b](https://placehold.it/150x40/00635b/FFFFFF?text=00635b)
![#5d3754](https://placehold.it/150x40/5d3754/FFFFFF?text=5d3754)
![#994878](https://placehold.it/150x40/994878/FFFFFF?text=994878)


### Light Colors
![#3eb1c8](https://placehold.it/150x40/3eb1c8/FFFFFF?text=3eb1c8)
![#f5e1a4](https://placehold.it/150x40/f5e1a4/FFFFFF?text=f5e1a4)
![#249e6b](https://placehold.it/150x40/249e6b/FFFFFF?text=249e6b)
![#fa9370](https://placehold.it/150x40/fa9370/FFFFFF?text=fa9370)
![#f8c1b8](https://placehold.it/150x40/f8c1b8/FFFFFF?text=f8c1b8)
![#f5e3cc](https://placehold.it/150x40/f5e3cc/FFFFFF?text=f5e3cc)

### Other Colors
![#f2f2f2](https://placehold.it/150x40/f2f2f2/1a1a1a?text=f2f2f2)
![#1a1a1a](https://placehold.it/150x40/1a1a1a/FFFFFF?text=1a1a1a)



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
