# Requirements

## Control Tower

### Functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR001 | The Control Tower shows a \<live overview\> of all open orders. | Must Have | Fiona Koevoets |
|  |     \<live overview\> = order number, customer type (B2B/B2C), SKU, status, promised delivery date, time of last update and responsible partner. |  |  |
| FR002 | The Control Tower receives all order, stock, print and shipment updates as events from the partner services through the message broker, without any manual input. | Must Have | Projectgroup |
| FR003 | Every order status in the Control Tower represents a \<happy flow event\>.  | Must Have | Fiona Koevoets |
|  |     \<happy flow event\> = order received, stock reserved, sent to print, printing, ready to ship, in transit, delivered. |  |  |
| FR004 | The Control Tower shows \<exceptions\> on the affected order.  | Must Have | Fiona Koevoets |
|  |     \<exceptions\> = out of stock, stuck in customs, print machine breakdown, carrier capacity shortage (vehicles or staff), failed delivery, lost package, wrong address. |  |  |
| FR005 | Exceptions always mention the responsible partner. | Should Have | Fiona Koevoets |
| FR006 | The Control Tower shows \<return events\> on the affected order.  | Must Have | Fiona Koevoets |
|  |    \<return events\> = return requested, return assessed, return received (where required), reprint / replacement / refund agreed. |  |  |
| FR007 | The employee can open an order and see its full event history (timeline), with the time of each event and the partner that reported it. | Must Have | Fiona Koevoets |
| FR008 | The employee can filter the open orders by status. | Must Have | Fiona Koevoets |
| FR009 | B2B priority orders are visibly marked and listed above B2C orders in the overview. | Should Have | Fiona Koevoets |
| FR010 | The Control Tower shows the current warehouse stock level per SKU and marks every SKU below its reorder point as a stock risk. | Must Have | Fiona Koevoets |
| FR011 | When an SKU is short, the Control Tower shows a list of all open orders affected by that SKU. | Must Have | Fiona Koevoets |
| FR012 | The Control Tower shows the status of every restock order to Hong Kong Novelty Goods. When the supplier reports a delay, the new expected delivery date is shown. | Must Have | Fiona Koevoets |
| FR013 | When PRINTZ reports a delay (e.g. a machine breakdown), the Control Tower shows the affected orders with their revised expected delivery date. | Must Have | Fiona Koevoets |
| FR014 | When DHL reports a delay (customs, too few vehicles or unavailable staff), the Control Tower shows the affected orders with their revised expected delivery date. | Must Have | Fiona Koevoets |
| FR015 | When an order is placed for a product that is out of stock, the Control Tower flags that the order can't be delivered within the \<standard delivery time\> and shows the reason.  | Must Have | Fiona Koevoets |
|  |     \<standard delivery time\> = 6 days. |  |  |
| FR016 | The employee can flag an order in the Control Tower. Flagging sends an email with the order number, the issue and the responsible partner. | Should Have | Fiona Koevoets |
| FR017 | The employee can trigger \<actions\> in the partner services from the Control Tower through the message broker. | Must Have | Fiona Koevoets |
|  |      \<actions\> = reprint request to PRINTZ, re-delivery request to DHL, extra restock order to Hong Kong Novelty Goods. |  |  |
| FR018 | When a problem affects a B2B priority order, the system sends an email that includes the affected orders, the urgency of the issue and any follow-up complaints. | Must Have | Fiona Koevoets |
| FR019 | The employee receives a \<notification\> when an order is delayed, out of stock or goes wrong.  | Should Have | Fiona Koevoets |
|  |     \<notification\> = Message that says which order it is about, what the reason is and which company is responsible. |  |  |
| FR020 | When two things go wrong in one order, the employee receives two separate notifications. | Should Have | Fiona Koevoets |
| FR021 | The employee can change the priority of an order. | Should Have | Fiona Koevoets |
| FR022 | The employee can assign an exception to a responsible person or partner and track its \<follow-up status\>. | Could Have | Fiona Koevoets |
|  |      \<follow-up status\> = open, in progress, resolved. |  |  |
| FR023 | The employee can send a message to a supply chain partner about a specific order from the Control Tower. | Could Have | Fiona Koevoets |
| FR024 | The Control Tower shows \<trends over time\> so busy periods like Christmas can be recognised.  | Should Have | Fiona Koevoets |
|  |     \<trends over time\> = number of orders and stock level per SKU per week. |  |  |
| FR025 | The Control Tower shows a \<KPI overview\>.  | Could Have | Fiona Koevoets |
|  |     \<KPI overview\> = percentage of orders delivered on time, number of open exceptions, average lead time. |  |  |
| FR026 | The Control Tower sends an alert when the lead time of an order exceeds its promised lead time by more than 20%. | Could Have | Fiona Koevoets |
| FR027 | The employee can see the number of delays and errors per company over a chosen period. | Could Have | Fiona Koevoets |
| FR028 | The employee can send a status update about a delay to the customers of all affected orders at once. | Could Have | Fiona Koevoets |
| FR029 | The Control Tower's access needs to be authenticated and authorized. | Won't Have | Mike Eden |
| FR030 | When a partner service is unavailable, the Control Tower keeps showing the last known status of the affected orders, with the time of the last update. | Should Have | Projectgroup |
| FR031 | The event history is kept for at least 12 months, so busy periods like Christmas can be compared year over year. | Could Have | Projectgroup |
| FR032 | A new event type can be added to the Control Tower without changing the existing partner services. | Could Have | Projectgroup |

### Non-functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR001 | The data in the Control Tower is \<consistent\> with the partner services.  | Must Have | Fiona Koevoets |
|  |     \<consistent\> = once all events are processed, every order status in the Control Tower is the same as in the service that reported it. |  |  |
| NFR002 | A duplicate or repeated event never results in a duplicate status, notification or email. | Should Have | Projectgroup |
| NFR003 | A status change is shown in the Control Tower \<near-real-time\>.  | Should Have | Projectgroup |
|  |     \<near-real-time\> = within 5 seconds after the partner publishes the event. |  |  |
| NFR004 | The order overview loads within 2 seconds with a \<test load\>.  | Should Have | Projectgroup |
|  |     \<test load\> = 1,000 open orders. |  |  |
| NFR005 | A notification or email about an exception is sent within 1 minute after the exception event is received. | Should Have | Projectgroup |
| NFR006 | No events are lost when the Control Tower or a partner service is temporarily unavailable. Missed events are processed once the service is available again. | Should Have | Projectgroup |
| NFR007 | The Control Tower works in the latest versions of Chrome, Edge and Firefox on screens of 1366×768 or larger. | Should Have | Projectgroup |
| NFR008 | Statuses and exceptions can be recognised without relying on colour alone (an icon or label is shown next to the colour). | Could Have | Projectgroup |

### Technical requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| TR001 | The Control Tower frontend is built in Svelte. | Must Have | Rimmert Zelle |
| TR002 | The Control Tower has its own database and does not read from or write to the database of another service. | Must Have | Mike Eden |
| TR003 | The Control Tower only receives status updates through events on the message broker, with no direct calls to other services. | Must Have | Projectgroup |
| TR004 | The complete system (Control Tower and all partner services) can be started with Docker Compose. | Should Have | Projectgroup |
| TR005 | All services use the shared event contracts from the API Message Design, which are stored in the repository. | Must Have | Projectgroup |

## Webshop

### Functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR001 | A customer can order products from a fixed SKU list. \<products\> = T-shirts, mugs, stuffed animals, cushions, phone covers, duvet covers. | Must Have | Fiona Koevoets |
| FR002 | A customer can personalise a product with \<personalisation\>. \<personalisation\> = own photo, text, or own logo/design. | Must Have | Fiona Koevoets |
| FR003 | Placing an order publishes an 'order received' event on the message broker. | Should Have | Projectgroup |
| FR004 | An order for a product that is out of stock is still accepted, and the customer is shown that it can't be delivered within the usual 6 days. | Must Have | Fiona Koevoets |
| FR005 | Orders from B2B customers are marked as priority orders. | Must Have | Fiona Koevoets |
| FR006 | Payments are simulated, including a 'payment failed' outcome. | Must Have | Fiona Koevoets |
| FR007 | The webshop shows the stock level and expected delivery time of each product. A product that is out of stock shows a delivery time longer than 6 days. | Should Have | Fiona Koevoets |
| FR008 | The customer enters a delivery address, and the webshop checks that all required address fields are filled in before the order is placed. | Should Have | Fiona Koevoets |
| FR009 | A customer can look up the current status of their order in the webshop. | Should Have | Fiona Koevoets |
| FR010 | A customer can request a return with a \<return reason\>. \<return reason\> = wrong product, wrong photo/print, damaged, other. | Should Have | Fiona Koevoets |
| FR011 | The customer sees a preview of the personalised product before ordering. | Could Have | Fiona Koevoets |
| FR012 | The customer receives a message when their order is shipped, delayed or delivered. | Could Have | Projectgroup |
| FR013 | Customers create a personal account and log in (for authenticating). | Should Have | Mike Eden |
| FR014 | Real payments through a bank or payment provider. | Won't Have | Fiona Koevoets |
| FR015 | No order is lost: when the message broker is temporarily unavailable, the order is saved and its 'order received' event is published as soon as the broker is available again. | Could Have | Projectgroup |

### Non-functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR001 | The stock level shown in the webshop is at most 30 seconds behind the stock in the warehouse service. | Should Have | Projectgroup |
| NFR002 | All webshop pages follow one consistent GIFTS-4-U visual style (logo, colours, fonts). | Should Have | Fiona Koevoets |
| NFR003 | The webshop can be used on mobile screens from 375 pixels wide. | Could Have | Projectgroup |

### Technical requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| TR001 | The webshop frontend is built in Svelte. | Must Have | Rimmert Zelle |
| TR002 | The webshop has its own database and does not read from or write to the database of another service. | Must Have | Mike Eden |
| TR003 | The webshop gets stock levels and delivery times from the other services through the API gateway and message broker. | Must Have | Projectgroup |

## DHL

### Functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR001 | The DHL service receives transport requests through the message broker for \<three legs\>.  | Must Have | Mike Eden |
|  |     \<three legs\> = Hong Kong Novelty Goods to warehouse, warehouse to PRINTZ, PRINTZ to customer. |  |  |
| FR002 | The DHL service publishes \<shipment events\>.  | Must Have | Mike Eden |
|  |     \<shipment events\> = picked up, in transit, delivered. |  |  |
| FR003 | The DHL service has a frontend with scenario buttons to simulate \<shipment exceptions\>. | Must Have | Mike Eden |
|  |      \<shipment exceptions\> = delay by customs, too few vehicles, unavailable staff, lost package, failed delivery, wrong address. |  |  |
| FR004 | A delay event includes the reason and the new expected delivery date. | Must Have | Mike Eden |
| FR005 | The customs scenario can only be triggered for shipments from outside the Netherlands. | Must Have | Mike Eden |
| FR006 | Every shipment has a tracking number that is linked to the order ID or restock order ID. | Must Have | Mike Eden |
| FR007 | The DHL service handles return shipments from the customer back to GIFTS-4-U. | Should Have | Mike Eden |
| FR008 | Real payments to DHL. DHL is simulated by our own service. | Won't Have | Mike Eden |
| FR009 | No shipment status change is lost when the message broker is temporarily unavailable. The event is published once the broker is available again. | Should Have | Projectgroup |

### Non-functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR001 | A scenario triggered with a button is published as an event within 2 seconds. | Should Have | Projectgroup |

### Technical requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| TR001 | The DHL frontend is built in Svelte. | Must Have | Rimmert Zelle |
| TR002 | The DHL service is a separate microservice that can be started and changed on its own without breaking the other services. | Must Have | Mike Eden |
| TR003 | The DHL service has its own database and does not read from or write to the database of another service. | Must Have | Mike Eden |
| TR004 | The DHL service communicates with the other services only through its API and the message broker. | Must Have | Projectgroup |

## Warehouse

### Functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR001 | The Excel document is replaced by an inventory service that updates the stock automatically when products come in, are shipped or are returned, without manual input. | Must Have | Fiona Koevoets |
| FR002 | When an order is received, the warehouse reserves the blank product in the same step and publishes a 'stock reserved' event. | Must Have | Fiona Koevoets |
| FR003 | When there is not enough stock for an order, the warehouse publishes an 'out of stock' event with the SKU and order ID. | Must Have | Fiona Koevoets |
| FR004 | The warehouse sends reserved blanks to PRINTZ by publishing a print order (with the image/text) and a DHL transport request. | Must Have | Fiona Koevoets |
| FR005 | When a restock delivery from Hong Kong Novelty Goods arrives, the stock of that SKU is increased automatically. | Must Have | Fiona Koevoets |
| FR006 | The warehouse has a simple frontend that shows the stock level and reorder point per SKU. | Must Have | Fiona Koevoets |
| FR007 | When stock of an SKU drops below its \<reorder point\>, a restock order is sent to Hong Kong Novelty Goods automatically.  | Should Have | Fiona Koevoets |
|  |     \<reorder point\> = minimum stock level, set per SKU. |  |  |
| FR008 | Fiona can set a higher minimum stock level for a period (e.g. Christmas), and automatic reordering takes it into account. | Should Have | Fiona Koevoets |
| FR009 | Automatic reordering takes the average delivery time from Hong Kong into account. | Should Have | Fiona Koevoets |
|  |      \<average delivery time\> = 2 weeks. |  |  |
| FR010 | After a return is registered, the stock is updated exactly once. | Should Have | Fiona Koevoets |
| FR011 | When stock is short, B2B priority orders are reserved before B2C orders. | Should Have | Fiona Koevoets |
| FR012 | The warehouse simulates the inventory of the physical store and restocks it automatically, so the store is always supplied. | Could Have | Fiona Koevoets |
| FR013 | Inventory of the physical store takes priority over the webstore in the inventory system. | Must Have | Fiona Koevoets |
| FR014 | The stock level can never be negative. | Should Have | Fiona Koevoets |
| FR015 | One unit is never reserved for two orders, also when orders come in at the same time. | Must Have | Fiona Koevoets |
| FR016 | No stock change is lost when the message broker is temporarily unavailable. | Should Have | Projectgroup |

### Non-functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR001 | A stock change is published as an event within 5 seconds after it happens. | Should Have | Projectgroup |

### Technical requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| TR001 | The warehouse service frontend is built in Svelte. | Must Have | Rimmert Zelle |
| TR002 | The warehouse service is a separate microservice that can be started and changed on its own without breaking the other services. | Must Have | Mike Eden |
| TR003 | The warehouse service has its own database and does not read from or write to the database of another service. | Must Have | Mike Eden |
| TR004 | The warehouse service communicates with the other services only through its API and the message broker. | Must Have | Projectgroup |

## PRINTZ

### Functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR001 | The PRINTZ service receives print orders through the message broker, containing order ID, SKU and the image/text to print. | Must Have | Projectgroup |
| FR002 | The PRINTZ service publishes \<print events\>.  | Must Have | Mike Eden |
|  |     \<print events\> = printing started, printed, ready to ship. |  |  |
| FR003 | When a print job is ready, the PRINTZ service publishes a DHL transport request to the customer. | Must Have | Mike Eden |
| FR004 | The PRINTZ service has a frontend with scenario buttons to simulate \<print exceptions\>. \<print exceptions\> = machine breakdown, print failed. | Must Have | Mike Eden |
| FR005 | A machine breakdown publishes a delay event with the new expected ready date for every affected order. | Must Have | Mike Eden |
| FR006 | The PRINTZ frontend shows the print queue with the status of every print job. | Should Have | Mike Eden |
| FR007 | PRINTZ can process a reprint request from the Control Tower (e.g. after a customer received the wrong photo). | Should Have | Mike Eden |
| FR008 | B2B priority print jobs are printed before B2C print jobs. | Should Have | Mike Eden |
| FR009 | The daily print capacity can be set, so capacity risks in busy periods become visible. | Could Have | Mike Eden |
| FR010 | No print event is lost when the message broker is temporarily unavailable. | Should Have | Projectgroup |

### Non-functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR001 | A scenario triggered with a button is published as an event within 2 seconds. | Should Have | Projectgroup |

### Technical requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| TR001 | The PRINTZ service frontend is built in Svelte. | Must Have | Rimmert Zelle |
| TR002 | The PRINTZ service is a separate microservice that can be started and changed on its own without breaking the other services. | Must Have | Mike Eden |
| TR003 | The PRINTZ service has its own database and does not read from or write to the database of another service. | Must Have | Mike Eden |
| TR004 | The PRINTZ service communicates with the other services only through its API and the message broker. | Must Have | Projectgroup |

## HK Export

### Functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| FR001 | The Hong Kong Novelty Goods service receives restock orders (SKU and quantity) through the message broker. | Must Have | Projectgroup |
| FR002 | The service confirms a restock order with an \<expected delivery date\>.  | Must Have | Mike Eden |
|  |     \<expected delivery date\> = order date + 2 weeks on average. |  |  |
| FR003 | When a restock order is dispatched, the service publishes a DHL transport request to the warehouse. | Must Have | Mike Eden |
| FR004 | The service has a frontend with scenario buttons to simulate a \<dispatch delay\>.  | Must Have | Mike Eden |
|  |     \<dispatch delay\> = a delay with a reason and a new expected delivery date. |  |  |
| FR005 | The service can deliver a smaller quantity than ordered (partial delivery) and reports the quantity that was sent. | Could Have | Mike Eden |
| FR006 | Real payments to Hong Kong Novelty Goods. The supplier is simulated by our own service. | Won't Have | Mike Eden |
| FR007 | No restock event is lost when the message broker is temporarily unavailable. | Should Have | Projectgroup |

### Non-functional requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| NFR001 | A restock order is confirmed with an expected delivery date within 5 seconds after it is received. | Should Have | Projectgroup |
| NFR002 | A scenario triggered with a button is published as an event within 2 seconds. | Should Have | Projectgroup |

### Technical requirements

| ID | Requirement | Priority | Source |
|---|---|---|---|
| TR001 | The Hong Kong Novelty Goods service frontend is built in Svelte. | Must Have | Rimmert Zelle |
| TR002 | The Hong Kong Novelty Goods service is a separate microservice that can be started and changed on its own without breaking the other services. | Must Have | Mike Eden |
| TR003 | The Hong Kong Novelty Goods service has its own database and does not read from or write to the database of another service. | Must Have | Mike Eden |
| TR004 | The Hong Kong Novelty Goods service communicates with the other services only through its API and the message broker. | Must Have | Projectgroup |