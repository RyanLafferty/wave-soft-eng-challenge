# Software Development Challenge

Applicants for the [Software
developer](xxx) role at xxx must
complete the following challenge, and submit a solution prior to the onsite
interview.

The purpose of this exercise is to create something that we can work on
together during the onsite. We do this so that you get a chance to collaborate
with xxx during the interview in a situation where you know something better
than us (it's your code, after all!)

There isn't a hard deadline for this exercise; take as long as you need to
complete it. However, in terms of total time spent actively working on the
challenge, we ask that you not spend more than a few hours, as we value your
time and are happy to leave things open to discussion in the on-site interview.

Please use whatever programming language and framework you feel the most
comfortable with.

Feel free to email [xxx](xxx) if you
have any questions.

## Captures
![alt text](URL "Site Image")
![alt text](URL "Drawer GIF")
![alt text](URL "Sort GIF")
![alt text](URL "Filter GIF")


## Project Description

Imagine that this is the early days of xxx history, and that we are prototyping
a new payroll system with an early partner. Our partner is going to use our web
app to determine how much each employee should be paid in each _pay period_, so
it is critical that we get our numbers right.

The partner in question only pays its employees by the hour (there are no
salaried employees.) Employees belong to one of two _job groups_ which
determine their wages; job group A is paid $20/hr, and job group B is paid
$30/hr. Each employee is identified by a string called an "employee id" that is
globally unique in their system.

Hours are tracked per employee, per day in comma-separated value files (CSV).
Each individual CSV file is known as a "time report", and will contain:

1. A header, denoting the columns in the sheet (`date`, `hours worked`,
   `employee id`, `job group`)
1. 0 or more data rows
1. A footer row where the first cell contains the string `report id`, and the
   second cell contains a unique identifier for this report.

Our partner has guaranteed that:

1. Columns will always be in that order.
1. There will always be data in each column.
1. There will always be a well-formed header line.
1. There will always be a well-formed footer line.

An example input file named `sample.csv` is included in this repo.

### What your web-based application must do:

We've agreed to build the following web-based prototype for our partner.

1. Your app must accept (via a form) a comma separated file with the schema
   described in the previous section.
1. Your app must parse the given file, and store the timekeeping information in
   a relational database for archival reasons.
1. After upload, your application should display a _payroll report_. This
   report should also be accessible to the user without them having to upload a
   file first.
1. If an attempt is made to upload two files with the same report id, the
   second upload should fail with an error message indicating that this is not
   allowed.

The payroll report should be structured as follows:

1. There should be 3 columns in the report: `Employee Id`, `Pay Period`,
   `Amount Paid`
1. A `Pay Period` is a date interval that is roughly biweekly. Each month has
   two pay periods; the _first half_ is from the 1st to the 15th inclusive, and
   the _second half_ is from the 16th to the end of the month, inclusive.
1. Each employee should have a single row in the report for each pay period
   that they have recorded hours worked. The `Amount Paid` should be reported
   as the sum of the hours worked in that pay period multiplied by the hourly
   rate for their job group.
1. If an employee was not paid in a specific pay period, there should not be a
   row for that employee + pay period combination in the report.
1. The report should be sorted in some sensical order (e.g. sorted by employee
   id and then pay period start.)
1. The report should be based on all _of the data_ across _all of the uploaded
   time reports_, for all time.

As an example, a sample file with the following data:

<table>
<tr>
  <th>
    date
  </th>
  <th>
    hours worked
  </th>
  <th>
    employee id
  </th>
  <th>
    job group
  </th>
</tr>
<tr>
  <td>
    4/11/2016
  </td>
  <td>
    10
  </td>
  <td>
    1
  </td>
  <td>
    A
  </td>
</tr>
<tr>
  <td>
    14/11/2016
  </td>
  <td>
    5
  </td>
  <td>
    1
  </td>
  <td>
    A
  </td>
</tr>
<tr>
  <td>
    20/11/2016
  </td>
  <td>
    3
  </td>
  <td>
    2
  </td>
  <td>
    B
  </td>
</tr>
</table>

should produce the following payroll report:

<table>
<tr>
  <th>
    Employee ID
  </th>
  <th>
    Pay Period
  </th>
  <th>
    Amount Paid
  </th>
</tr>
<tr>
  <td>
    1
  </td>
  <td>
    1/11/2016 - 15/11/2016
  </td>
  <td>
    $300.00
  </td>
</tr>
  <td>
    2
  </td>
  <td>
    16/11/2016 - 30/11/2016
  </td>
  <td>
    $90.00
  </td>
</tr>
</table>

Your application should be easy to set up, and should run on either Linux or
Mac OS X. It should not require any non open-source software.

There are many ways that this application could be built; we ask that you build
it in a way that showcases one of your strengths. If you enjoy front-end
development, do something interesting with the interface. If you like
object-oriented design, feel free to dive deeper into the domain model of this
problem. We're happy to tweak the requirements slightly if it helps you show
off one of your strengths.

### Documentation:

Please modify `README.md` to add:

1. Instructions on how to build/run your application
1. A paragraph or two about what you are particularly proud of in your
   implementation, and why.

## Submission Instructions

1. Clone the repository.
1. Complete your project as described above within your local repository.
1. Ensure everything you want to commit is committed.
1. Create a git bundle: `git bundle create your_name.bundle --all`
1. Email the bundle file to [xxx](xxx)

## Evaluation

Evaluation of your submission will be based on the following criteria.

1. Did you follow the instructions for submission?
1. Did you document your build/deploy instructions and your explanation of what
   you did well?
1. Were models/entities and other components easily identifiable to the
   reviewer?
1. What design decisions did you make when designing your models/entities? Are
   they explained?
1. Did you separate any concerns in your application? Why or why not?
1. Does your solution use appropriate data types for the problem as described?

### Documentation:

#### Building The Application:
My application is broken down into two parts, the user interface and the API. Instructions for
building both parts will be listed below as well as additional documentation located within the
api and ui directories.

#### API
1. Change directory into the api directory
2. To build the api server run **make up**
3. To run migrations use the following commands **make ssh** and **python manage.py migrate**

```Bash
cd api
make up
make ssh
python manage.py migrate
```

* If you run into issues where the app container crashes on startup because the db container did not finish building simply stop the containers once the db container finishes building using ctrl + c and repeat the **make up** command
* If you run into issues where the tables did not build during the docker startup sequence you can manually copy and paste the database and table schemas from the **init.sql** file located within the **data** directory


##### User Interface
1. Change directory into the ui directory
2. Install the dependencies using **yarn install**
3. To start the dev server run **yarn start**

```Bash
cd ui
yarn install
yarn start
```

#### What I Am Proud Of:
I am proud of the way in which I have designed my stack, separating the user interface from the API. The benefit is if our API is under heavy utilization by other programs our user interface will still be delivered in a timely manner as it would be hosted on a separate server.

Focussing on the user interface I am most proud of the design in which I utilized to build it. I designed the interface in a modular fashion separating the components from the screens as well as the data from the user interface components with the use of a redux store. The actions and reducers are built in their own directory allowing for a more organized codebase.

On the API side of things, working with Django again allowed me to separate each portion of the application in a modular way, allowing for a more maintainable and extensible application.


#### Models

##### Record
The following model is used to store a payment record, which is needed for archival purposes.

* eid INT UNSIGNED - employee id
* rid INT UNSIGNED - report id
* job_group VARCHAR(1)
* hours FLOAT UNSIGNED
* date DATE

##### Payment
The following model is used to store a payment period for a given employee. This model is displayed to the user in the payroll report.

* eid INT UNSIGNED - employee id
* rid INT UNSIGNED - report id
* start_date DATE - the start of the pay period
* end_date DATE - the end of the pay period
* amount FLOAT UNSIGNED


#### Future Improvements:
* Mobile UI Support - I would like to add custom Mobile UI components and screens if I had time to
* Internationalization - I would have liked to internationalize my application using react-intl
* Server Side Pagination - I would have like to utilized the server side pagination that I had setup, currently the front end is handling pagination with the backend serving a single page of 1000
* CORS - I would have liked to setup the CORS headers on the ui-server which was utilized to host the ui during early stages of development
* NGINX - I would have liked to add uwsgi and NGINX to my API stack if given more time
* Error Handling - If given more time I would add validation to the csv parser as well as any accompanying error handling

