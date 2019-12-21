import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import ListStudents from '~/pages/Students/ListStudents';
import EditStudent from '~/pages/Students/EditStudent';
import NewStudent from '~/pages/Students/NewStudent';
import ListPlans from '~/pages/Plans/ListPlans';
import EditPlan from '~/pages/Plans/EditPlan';
import NewPlan from '~/pages/Plans/NewPlan';
import ListEnrollments from '~/pages/Enrollments/ListEnrollments';
import NewEnrollment from '~/pages/Enrollments/NewEnrollment';
import EditEnrollment from '~/pages/Enrollments/EditEnrollment';
import ListQuestions from '~/pages/Questions/ListQuestions';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={ListStudents} isPrivate />
      <Route path="/students/:id/edit" component={EditStudent} isPrivate />
      <Route path="/students/new" component={NewStudent} isPrivate />
      <Route path="/plans" exact component={ListPlans} isPrivate />
      <Route path="/plans/:id/edit" component={EditPlan} isPrivate />
      <Route path="/plans/new" component={NewPlan} isPrivate />
      <Route path="/enrollments" exact component={ListEnrollments} isPrivate />
      <Route
        path="/enrollments/:id/edit"
        component={EditEnrollment}
        isPrivate
      />
      <Route path="/enrollments/new" component={NewEnrollment} isPrivate />
      <Route path="/help-orders" exact component={ListQuestions} isPrivate />
    </Switch>
  );
}
