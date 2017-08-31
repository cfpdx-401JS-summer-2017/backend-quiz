# Makeup Back End Quiz

Create an express/node/mongoose/mongo server for a pet liking (raves) site.

## Rules

* **Make an initial commit when you start your work**this
* You have 150 minutes to complete
* You must complete this work on your own within the alotted time
  * Keep a good commit history to show progression of work.
* You may use normal resources that a software developer uses on the job (docs, google, your prior work)
* You may install npm packages of your choosing
* Use general best practices and common sense
  * Highly recommended to implement what is needed, no more no less
  * Blind boilerplate may not be helpful and will likely create more work
  * Focus effort on requirements
* You may ignore the presense or absense of `__v` mongoose property on 
any data format requirements (do whatever you need to with `__v` to get to passing tests)
* There are very specific testing requirements listed (after the API section)
  * You are not required to do any more than this
* Total possible points are 70. You will be graded out of 50 points
* Demonstrating what you know by having green tests that pass and show working code.

## Overarching requirements
* Do a fork and PR like a normal lab
* Include travis info. Having a green travis on your PR will count significantly.
* Include a `server.js` for running your server normally
* Include normal `npm`, `git`, `lint`, etc., etc., files

## API Requirements

### Accepts post of a new pet

#### `POST` to `/pet` of data in following format:

```
{
    name: <required: string>,
    type: <required: cat|dog|bird|fish|snake>,
    breed: <string>,
    catchPhrase: <string, max 140 chars>
}
```

* `name`, `type` are required
* `type` should be limited to one of specified values: cat|dog|bird|fish|snake

If any of those conditions are not met, return a 400 status code.

The JSON return response to `POST` should return the full document (all the fields).

### Add a rave

#### POST to `/raves`:

```
{
    pet: <required: id of the pet being raved>,
    comments: <required: string, max length: 250 characters>,
    email: <required: email of the user making the rave>
}
```

* All fields are required, otherwise return 400 error
* Check that:
    * The pet id exists before saving, if it doesn't return 400 and don't save the rave.
    * The user (represented by the `email` prop) does **NOT** already have a rave for this pet. If they 
do, return 400 error and don't save the rave.


#### `GET` to `/raves`:

```
[
    { _id: "123a...bc", comments: "What a cute pet", email: "user@user.com", pet: { _id: "340f...s9", name: "Felix", type: "cat" } },
    { _id: "123a...bc", comments: "Fancy cat!", email: "user@user.com", pet: { _id: "340f...s9", name: "Felix", type: "cat" } },
    { _id: "123a...bc", comments: "What a swimmer", email: "user@user.com", pet: { _id: "444f...eb", name: "Nemo", type: "fish" } },
]
```
* Returns full rave document plus populate `pet` with `name` and `type`

#### `GET` to `/pets`:

```
[
    { _id: "123a...bc", name: "Felix", type: "cat" },
    { _id: "456d...ef", name: "Nemo", type: "fish" },
    { _id: "789g...hi", name: "Nagini", type: "snake" }
]
```

* Return exact fieldset indicated above

#### `GET` to `/pets?type=<type of pet>`:

Same as above, except only return restaurants that match that cuisine

#### `GET` to `/pets/:id`:

* Return the full pet document, plus add a `raves` property that is the list of 
raves for this pet.

```
{ 
  _id: "123a...bc", 
  name: "Felix", 
  type: "cat", 
  breed: "tuxedo",
  catchPhrase: "Meowsers!",
  raves: [{
    _id: "789g...hi",
    pet: "123a...bc",
    comments: "Cutest tuxedo ever!",
    email: "user@user.com"
  }, {
    _id: "597g...yp",
    pet: "123a...bc",
    comments: "Love that catch phrase!",
    email: "another@user.com"
  }] 
}
```

## Testing

You *only* need to include the following e2e test scenario (note that only things marked **Test** 
need to assert correctness):

* Connect to a test databse and drop database before test
* Test this workflow (structure into `describe`/`it`):
  * POST two pets, each of a different type
  * POST two raves from one user emails to both of the pets
  * POST two raves from another user email to both of the pets
  * **Test** that `GET` `/pets` returns both pets
  * **Test** that `GET` `/pets?type=<one of the pet types>` only returns the one correct pet
  * **Test** that `GET` `/raves` returns all four raves plus pet name and type
  * **Test** that `GET` `/pets/:id` for one of the pets returns all fields and has the two raves
