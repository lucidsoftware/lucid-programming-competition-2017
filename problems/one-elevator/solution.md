# Elevator - solution

Simplify the problem by splitting the floors into positive floors and negative floors.

Assuming the eleavtor makes round-trips, it's best to provision for the farthest floors first, to minimize the number
of trips that must be made. (E.g. you'd rather reach the top floor with two full loads, than four half-loads). Order
the floor requests farther to nearest. The 0th request, the Cth request, the 2Cth request, etc. are the endpoints for
each of your round trips.

Combine the results for positive and negative floors.

The final floor the elevator delivers to is special, as it does not require a round-trip. Therefore, select the
farthest floor (positive or negative) and adjust from a two-way to a one-way trip.
