require "spec_helper"

describe "CWIC-enabled granule results", reset: false do
  extend Helpers::CollectionHelpers
  before :all do
    load_page :search, q: 'C1220566654-USGS_LTA'
  end

  context "when viewing granule results for a CWIC-enabled collection" do
    hook_granule_results("EO-1 (Earth Observing-1) Advanced Land Imager (ALI) Instrument Level 1R, Level 1Gs, Level 1Gst Data")

    context "clicking the button to remove a granule" do

      before :all do
        first_granule_list_item.trigger('click')
        first_granule_list_item.find_link("Exclude this granule").trigger("click")
        wait_for_xhr
      end

      it "removes it from the list", acceptance: true do
        expect(page).to have_css('#granule-list .panel-list-item', count: 19)
        expect(granule_list).to have_content("Showing 19 of 85201 matching granules")
      end

      context "and undoing a removal" do
        before :all do
          find_link('Undo').trigger('click')
        end

        after :all do
          first_granule_list_item.trigger('click')
          first_granule_list_item.find_link("Exclude this granule").trigger("click")
          wait_for_xhr
        end

        it "adds it back to the list" do
          expect(page).to have_css('#granule-list .panel-list-item', count: 20)
          expect(granule_list).to have_content("Showing 20 of 85202 matching granules")
        end
      end

      context "and updating the query" do
        before :all do
          visit current_url
          wait_for_xhr
        end

        it "continues to exclude the removed granule from the list", acceptance: true do
          expect(page).to have_css('#granule-list .panel-list-item', count: 19)
          expect(granule_list).to have_content("Showing 19 of 85201 matching granules")
        end
      end

      context "and going to data access page" do
        before :all do
          login
          find_link('Download Collection Data').trigger('click')
          wait_for_xhr
        end

        after :all do
          find_link('Back to Search Session').trigger('click')
          wait_for_xhr
        end


        it "shows one excluded granule" do
          expect(page).to have_content("85201 Granules")
        end

        context "and submitting a download order then viewing granule links" do
          before :all do
            choose 'Download'
            click_on 'Submit'
            wait_for_xhr
            click_on('View Download Links')
          end

          after :all do
            find_link('Back to Data Access Options').trigger('click')
            wait_for_xhr
          end

          it "provides a list of download links for the remaining granules" do
            within_last_window do
              expect(page).to have_no_text('Loading more...')
              expect(page).to have_link('Granule download URL', count: 99)
            end
          end
        end
      end
    end
  end
end
