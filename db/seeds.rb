# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "csv"

CSV.foreach("db/romaji-city.csv", headers: true) do |row|
  City.create!(
    name: row["name"],
    subname: row["sub_name"],
    subnamesub: row["sub_name_sub"],
    roman: row["roman"],
    subroman: row["sub_roman"]
  )
end

