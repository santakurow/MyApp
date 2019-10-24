class CreateCities < ActiveRecord::Migration[5.0]
  def change
    create_table :cities do |t|
      t.string :name, null: false
      t.string :subname, null: false
      t.string :subnamesub, null: false
      t.string :roman, null: false
      t.string :subroman, null: false

      t.timestamps
    end
  end
end
