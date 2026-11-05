---
layout: mds
title: 'Developing a Custom Framework for Autonomous Motions'
date: '2026-11-05'
image: '/autonomous-motions/robot.png'
imageAlt: 'Our robot for the 2026 Vex Robotics Competition'
---

<script>
  import Link from "$lib/components/ui/Link.svelte"
</script>

I developed a custom template to program autonomous routines for our robotics team year, and I wanted to share a couple unique aspects of it in this article.

## What is this template used for?

Our robot has to perform actions autonomously for 15 seconds or 1 minute, and in these autonomous routines it has to perform various tasks like intaking blocks, placing them in goals, etc.

A template allows us to easily build these routines by telling the robot where to move and how to move. For instance, here is a snippet of code we used in one of our autonomous routines:

```c++
// Drive in front of the 2nd loader
chassisReference->turnTo(Pose<double>(-49, -46.5, -360), {.turnSettleTime = 0, .turnSettleError = 30, .turnMinVoltage = 2}, {});
chassisReference->driveToPoint(Pose<double>(-49, -46.5, 0), {.driveTimeout = 1100, .driveSettleTime = 200}, {}, {});

// Ram into 2nd loader
chassisReference->turnTo(Pose<double>(-68, -47, -360), {.turnSettleTime = 0, .turnTimeout = 700}, {});
chassisReference->driveWithVoltage(6.5, 500, chassisReference->getAbsoluteHeading().angle, turnParams10_deg(), {});

// Line up to long goal
chassisReference->turnTo(Pose<double>(-24, -47.25, -360), {.turnTimeout = 300}, {.forwards = false});
chassisReference->driveToPoint(Pose<double>(-24, -47.25, 0), {.driveTimeout = 1200}, turnParams10_deg(), {.forwards = false});
```

In this code snippet you’ll see that we tell the robot to move to some coordinate on the field like -68 inches on the x-axis and -47 inches on the y-axis. We get these coordinates from a path planner (<Link href="https://path.jerryio.com/" text="https://path.jerryio.com/" />) and then tune them on the real field, one of the routes we use is shown below:

<figure>
  <img src="/autonomous-motions/autonomous-route.png" alt="Autonomous route on the VEX field in the path planner" />
</figure>

Essentially what the template does is give us these building blocks for creating these autonomous routines. Functions for doing things like driving to a point on the field, turning some number of degrees, following a path, etc.

You can find all of the different types of autonomous motion we created here, <Link href="https://github.com/Github11200/Motion-Control-Framework/tree/main/src/motions" text="https://github.com/Github11200/Motion-Control-Framework/tree/main/src/motions" />.

## Interpolated Look Up Table (InterpLUT)

For every movement, we use a <Link href="https://www.realpars.com/blog/pid-controller" text="PID controller" />. This is a basic algorithm where the robot will move fast when it is far away from a target, and slow down as it gets closer so it doesn’t overshoot the target. You can find our implementation for it <Link href="https://github.com/Github11200/Motion-Control-Framework/blob/main/src/controlSystems/pid.cpp" text="here" />.

A PID requires us to tune 3 constants, and these essentially change how the robot moves to the target. However, to make the movements accurate, we have to tune a different set of constants for several distances the robot may move. We may have one set of constants for moving 10 inches, another for moving 20 inches, and so on. Here are some of the constants we tuned for driving 30, 50, and 100 inches:

```c++
DriveParams driveParams30_in()
{
  DriveParams driveParams;
  driveParams.driveKp = 0.5;
  driveParams.driveKd = 3.15;
  driveParams.driveKi = 0;
  driveParams.driveStartIntegratingLimit = 0;
  return driveParams;
}
DriveParams driveParams50_in()
{
  DriveParams driveParams;
  driveParams.driveKp = 0.45;
  driveParams.driveKd = 3;
  driveParams.driveKi = 0;
  driveParams.driveStartIntegratingLimit = 0;
  return driveParams;
}
DriveParams driveParams100_in()
{
  DriveParams driveParams;
  driveParams.driveKp = 0.4;
  driveParams.driveKd = 3;
  driveParams.driveKi = 0;
  driveParams.driveStartIntegratingLimit = 0;
  return driveParams;
}
```

Now, this raises the question, what happens if we have tuned PID constants for moving 30 inches and 50 inches, but want to move 40 inches? Or 41.25 inches? We can’t keep tuning new sets of constants for every single movement.

To overcome this challenge, we interpolate between all the constants to fill in the gaps. Here is a visualization of this:

<figure>
  <img src="/autonomous-motions/interpolated-pid-constants.png" alt="PID constants interpolated with monotonic cubic splines" />
</figure>

You can see we have several kP, kI, and kDvalues for turning 10, 30, 45 degrees and so on. Then, to fill in the gaps in between each of these constants, we interpolate using a <Link href="https://en.wikipedia.org/wiki/Monotone_cubic_interpolation" text="monotonic cubic spline" />.

This is essentially just a normal spline, but, since it’s monotonic, the slope between two points will always either be increasing or always decreasing so the curve won’t change erratically between two points.

The actual code for implementing the look up table can be found <Link href="https://github.com/Github11200/Motion-Control-Framework/blob/main/src/utils/interpLUT.cpp" text="here" />.

Now, let’s say the robot was originally supposed to 30 inches from where it is to the target point. However, while the autonomous routine was running, the robot got knocked off path and now has to move 40 inches. To account for this, we can simply just retune the constants as the routine is running, and this is what’s being done at the start of every single movement as shown in the snippet below:

```c++
double distanceToTarget = currentPose.position.distanceTo(target.position);
double driveError = distanceToTarget;

modifyDriveParams(abs(driveError), driveParams);
```

This is how the modifyDriveParams function is defined:

```c++
void modifyDriveParams(double driveError, DriveParams &params)
{
  params.driveKp = driveParamsKpLUT.interpolate(driveError);
  params.driveKi = driveParamsKiLUT.interpolate(driveError);
  params.driveKd = driveParamsKdLUT.interpolate(driveError);
}
```

It simply just plugs the driveError into the x-axis of the graph, and the look up table will output the constant that should be used for that particular movement.

Using this look up table, all of our movements were way more accurate (error tolerances when driving were &lt;1 inch), and all the movements just looked snappier. It was also able to take into account errors while the routine was running and could compensate for them.

## 2D Motion Profile + RAMSETE

A motion profile is essentially a pre-planned trajectory that the robot follows. This means the robot will know that at each point in time it should have a certain velocity, acceleration, and heading. Here is a visualization of what it looks like:

<figure>
  <img src="/autonomous-motions/motion-profile.png" alt="Cubic Bézier path with velocity and motion profile graphs" />
</figure>

The top left is the path represented as Cubic Bézier spline, and the two graphs in the bottom show the velocity. You can see that as the robot goes around a curve the velocity is reduced, but, as it travels in a straight line, it increases again and decreases once more.

The way this works is you essentially take the first and second derivatives of the curve, and then apply kinematics constraints (e.g. the maximum velocity the robot can achieve given the initial velocity and acceleration) at each point going from the start of the path to the end and then again from the end to the start.

Once the trajectory is planned out it’ll output the following properties at every timestamp:

```c++
struct MotionProfilePose
{
  double time;
  Pose<double> pose;
  double velocity;
  double angularVelocity;
  double acceleration;
};
```

We could now just follow the path, but, the robot is always going to deviate some amount so to make it more accurate we have to take into account these errors. We used a <Link href="https://wiki.purduesigbots.com/software/control-algorithms/ramsete" text="RAMSETE controller" /> for this which will calculate the error while the robot is moving, use that to calculate a gain value, and then translate that to linear and angular velocities the robot needs to move at to stay on the path.

The code for the 2D motion profile and RAMSETE can be found <Link href="https://github.com/Github11200/Motion-Control-Framework/blob/main/src/motions/curvedMotionProfile.cpp" text="here" />.

## Real-Time Data Visualization

We wanted to be able to visualize two main pieces of data:

1. The position data as the robot moves around. This allows us to see where the robot thinks it is versus where it actually is in real life.
2. Graph the error data (how far the robot is from the target point) from the PID so we can easily see how to tune the constants.

In order to send the data we used a builtin websocket to stream it every 0.6 seconds. Here is what the odometry visualization looks like:

<figure>
  <img src="/autonomous-motions/odometry-visualization.png" alt="Real-time robot position and odometry visualization" />
</figure>

And the visualization for the PID data:

<figure>
  <img src="/autonomous-motions/pid-visualization.png" alt="Real-time PID error visualization with a target line" />
</figure>

Normally, you would see a line that is oscillating over the red target line showing how the error changes over time as the robot moves. Based on the shape of that graph, we would know whether to increase or decrease the values of the constants.

## Conclusion

If you want to look deeper into any of the code here are the GitHub repositories:

- <Link href="https://github.com/Github11200/Motion-Control-Framework" text="Motion Control Framework" />
- <Link href="https://github.com/Github11200/Robot-Data-Visualization" text="Data Visualization" />

Feel free to reach out if you have any questions and/or suggestions!
