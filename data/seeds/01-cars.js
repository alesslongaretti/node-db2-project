
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '97HDGSVH6', make: 'BMW', model: "X6", mileage: "50",
        transmission: "automatic", title: 'clean'},
        {VIN: '7484HDGHJF7', make: 'Honda', model: "Accord", mileage: "1200",
        transmission: "manual", title: 'lemon'},
      ]);
    });
};
